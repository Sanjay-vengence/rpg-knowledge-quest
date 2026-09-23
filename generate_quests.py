
import json
import time
import os

from agent.knowledge_agent import get_knowledge_response
from agent.game_master_agent import create_quest


# ==========================================
# CONFIGURATION
# ==========================================

OUTPUT_FILE = "data/generated_quests.json"

topics = [
    "Tell me about the first Kural and its meaning.",
    "Tell me about the second Kural and its meaning.",
    "Tell me about the third Kural and its meaning.",
    "Tell me about the fourth Kural and its meaning.",
    "Tell me about the fifth Kural and its meaning.",
    "Tell me about the sixth Kural and its meaning.",
    "Tell me about the seventh Kural and its meaning.",
    "Tell me about the eighth Kural and its meaning.",
    "Tell me about the ninth Kural and its meaning.",
    "Tell me about the tenth Kural and its meaning.",
]

difficulties = ["easy", "medium", "hard"]


# ==========================================
# SAFE API CALL WITH RETRIES
# ==========================================

def safe_call(func, *args, **kwargs):
    """
    Retries API calls when rate limits occur.
    """

    max_retries = 5
    wait_time = 30

    for attempt in range(max_retries):
        try:
            return func(*args, **kwargs)

        except Exception as e:
            error_message = str(e)

            if (
                "RESOURCE_EXHAUSTED" in error_message
                or "429" in error_message
                or "rate limit" in error_message.lower()
            ):
                print(
                    f"  ⚠️ Rate limited. "
                    f"Waiting {wait_time}s before retry "
                    f"({attempt + 1}/{max_retries})..."
                )

                time.sleep(wait_time)
                wait_time += 15

            else:
                raise

    raise Exception("❌ Maximum retries exceeded.")


# ==========================================
# CREATE DATA DIRECTORY
# ==========================================

os.makedirs("data", exist_ok=True)


# ==========================================
# LOAD EXISTING PROGRESS
# ==========================================

if os.path.exists(OUTPUT_FILE):
    try:
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            all_quests = json.load(f)

        if not isinstance(all_quests, list):
            print("⚠️ Existing JSON is not a list. Starting fresh.")
            all_quests = []

    except json.JSONDecodeError:
        print("⚠️ Existing JSON is invalid. Starting fresh.")
        all_quests = []

else:
    all_quests = []


# ==========================================
# ENSURE EXISTING QUESTS HAVE VALID IDs
# ==========================================

used_ids = set()

for index, quest in enumerate(all_quests, start=1):
    if not isinstance(quest, dict):
        continue

    quest_id = quest.get("id")

    if not quest_id:
        quest_id = f"quest_{index:03d}"

    quest_id = str(quest_id)

    # Avoid duplicate IDs
    if quest_id in used_ids:
        quest_id = f"quest_{index:03d}"

    quest["id"] = quest_id
    used_ids.add(quest_id)


# ==========================================
# TRACK ALREADY-GENERATED COMBINATIONS
# ==========================================

existing_keys = {
    (
        quest.get("topic"),
        quest.get("difficulty")
    )
    for quest in all_quests
    if isinstance(quest, dict)
}


def get_next_quest_id():
    """
    Generates a unique quest ID.
    """

    number = len(all_quests) + 1
    quest_id = f"quest_{number:03d}"

    while quest_id in used_ids:
        number += 1
        quest_id = f"quest_{number:03d}"

    used_ids.add(quest_id)

    return quest_id


def save_quests():
    """
    Saves all quests to the JSON file.
    """

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(
            all_quests,
            f,
            ensure_ascii=False,
            indent=2
        )


print(f"📂 Existing quests loaded: {len(all_quests)}")


# ==========================================
# GENERATE QUESTS
# ==========================================

for topic in topics:

    print(f"\n📚 Topic: {topic}")

    # Fetch knowledge only once per topic
    print("  🧠 Fetching knowledge...")

    fact = safe_call(
        get_knowledge_response,
        topic
    )

    time.sleep(20)

    for difficulty in difficulties:

        quest_key = (topic, difficulty)

        # Skip already-generated quests
        if quest_key in existing_keys:
            print(
                f"  ⏭️ Skipping existing quest "
                f"[{difficulty}]"
            )
            continue

        print(
            f"  🎮 Generating quest "
            f"[{difficulty}]..."
        )

        quest = safe_call(
            create_quest,
            fact,
            difficulty=difficulty
        )

        time.sleep(20)

        # ==========================================
        # VALIDATE QUEST OBJECT
        # ==========================================

        if not isinstance(quest, dict):
            print("  ❌ Invalid quest returned. Skipping.")
            continue

        # ==========================================
        # NORMALIZE FIELD NAMES
        # ==========================================

        # Add a unique ID
        quest["id"] = get_next_quest_id()

        # Store the original topic
        quest["topic"] = topic

        # Force the requested difficulty
        quest["difficulty"] = difficulty

        # Support older Game Master field name
        if "question" not in quest:
            if "challenge_question" in quest:
                quest["question"] = quest["challenge_question"]

            elif "challengeQuestion" in quest:
                quest["question"] = quest["challengeQuestion"]

        # Ensure a question exists
        if not quest.get("question"):
            print(
                "  ⚠️ Quest has no question field. "
                "Skipping."
            )
            continue

        # ==========================================
        # NORMALIZE OPTIONS
        # ==========================================

        if "options" not in quest:
            if "choices" in quest:
                quest["options"] = quest["choices"]

            elif "answers" in quest:
                quest["options"] = quest["answers"]

        options = quest.get("options")

        if not isinstance(options, list) or len(options) != 4:
            print(
                "  ⚠️ Quest must contain exactly "
                "4 options. Skipping."
            )
            continue

        # Convert every option to a string
        quest["options"] = [
            str(option).strip()
            for option in options
        ]

        # ==========================================
        # NORMALIZE CORRECT ANSWER
        # ==========================================

        if "correct_answer" not in quest:
            if "correct_option" in quest:
                quest["correct_answer"] = quest["correct_option"]

            elif "correctAnswer" in quest:
                quest["correct_answer"] = quest["correctAnswer"]

            elif "answer" in quest:
                quest["correct_answer"] = quest["answer"]

        if "correct_answer" not in quest:
            print(
                "  ⚠️ Quest has no correct_answer field. "
                "Skipping."
            )
            continue

        correct_answer = quest["correct_answer"]

        # If the correct answer is a numeric string,
        # convert it to an integer.
        if isinstance(correct_answer, str):
            stripped_answer = correct_answer.strip()

            if stripped_answer.isdigit():
                correct_answer = int(stripped_answer)

            else:
                # If correct_answer is option text,
                # convert it into its corresponding index.
                matching_indices = [
                    index
                    for index, option in enumerate(quest["options"])
                    if option.strip() == stripped_answer
                ]

                if len(matching_indices) == 1:
                    correct_answer = matching_indices[0]

                else:
                    print(
                        "  ⚠️ Could not convert correct_answer "
                        "text into an option index. Skipping."
                    )
                    continue

        # Ensure the correct answer is an integer index
        if not isinstance(correct_answer, int):
            print(
                "  ⚠️ correct_answer must be an integer "
                "between 0 and 3. Skipping."
            )
            continue

        if correct_answer < 0 or correct_answer > 3:
            print(
                "  ⚠️ correct_answer must be between "
                "0 and 3. Skipping."
            )
            continue

        quest["correct_answer"] = correct_answer

        # ==========================================
        # REMOVE OLD/UNNECESSARY ANSWER FIELDS
        # ==========================================

        quest.pop("challenge_question", None)
        quest.pop("challengeQuestion", None)
        quest.pop("choices", None)
        quest.pop("answers", None)
        quest.pop("correct_option", None)
        quest.pop("correctAnswer", None)
        quest.pop("answer", None)
        quest.pop("correct_index", None)
        quest.pop("correctIndex", None)

        # ==========================================
        # SAVE PROGRESS
        # ==========================================

        all_quests.append(quest)
        existing_keys.add(quest_key)

        save_quests()

        print(
            f"  ✅ Saved quest: {quest['id']} "
            f"| Difficulty: {quest['difficulty']} "
            f"| Correct option index: {quest['correct_answer']} "
            f"| Total quests: {len(all_quests)}"
        )


# ==========================================
# FINAL SUMMARY
# ==========================================

print(
    f"\n🎉 Done! Generated "
    f"{len(all_quests)} quests total."
)

print(f"📁 Saved to: {OUTPUT_FILE}")

