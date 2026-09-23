
import os
import json
import re

from dotenv import load_dotenv
from google import genai


# ==========================================
# LOAD GEMINI API
# ==========================================

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError(
        "GEMINI_API_KEY not found. "
        "Please add it to your .env file."
    )

client = genai.Client(api_key=api_key)


# ==========================================
# CREATE QUEST
# ==========================================

def create_quest(
    knowledge_content: str,
    difficulty: str = "easy"
) -> dict:
    """
    Converts factual Tamil literature knowledge into
    a structured RPG quest.

    Returns:
    {
        "story": "...",
        "question": "...",
        "options": ["...", "...", "...", "..."],
        "correct_answer": 0,
        "difficulty": "easy"
    }
    """

    system_instruction = f"""
You are the Game Master of a Tamil literature RPG called
"Knowledge Quest".

Your job is to transform factual literary content into
an engaging but educational RPG quest.

DIFFICULTY: {difficulty}

Create a quest containing:

1. "story"
   - 2-3 sentences
   - RPG-style narrative
   - Example: an ancient temple, village elder, sacred scroll,
     guardian, treasure, or mysterious chamber

2. "question"
   - One clear question testing understanding of the knowledge
   - Do not ask something unrelated to the provided content

3. "options"
   - Exactly four multiple-choice options
   - Only one option must be correct
   - The other three must be plausible but incorrect

4. "correct_answer"
   - An INTEGER from 0 to 3
   - It represents the index of the correct option
   - 0 = first option
   - 1 = second option
   - 2 = third option
   - 3 = fourth option

5. "difficulty"
   - Must be exactly: "{difficulty}"

IMPORTANT:
- Use ONLY the supplied knowledge content.
- Do not invent literary facts.
- Keep the question suitable for the specified difficulty.
- Return ONLY valid JSON.
- Do not use Markdown code fences.
- Do not include explanations outside the JSON.

Return exactly this structure:

{{
  "story": "...",
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "correct_answer": 0,
  "difficulty": "{difficulty}"
}}

KNOWLEDGE CONTENT:
{knowledge_content}
"""

    # ==========================================
    # CALL GEMINI
    # ==========================================

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=system_instruction
    )

    raw_text = response.text.strip()

    # ==========================================
    # CLEAN MARKDOWN CODE FENCES
    # ==========================================

    if raw_text.startswith("```"):

        raw_text = re.sub(
            r"^```(?:json)?\s*",
            "",
            raw_text,
            flags=re.IGNORECASE
        )

        raw_text = re.sub(
            r"\s*```$",
            "",
            raw_text
        )

        raw_text = raw_text.strip()

    # ==========================================
    # PARSE JSON
    # ==========================================

    try:

        quest = json.loads(raw_text)

    except json.JSONDecodeError as e:

        raise ValueError(
            f"Gemini returned invalid JSON:\n{raw_text}"
        ) from e

    # ==========================================
    # VALIDATE REQUIRED FIELDS
    # ==========================================

    required_fields = [
        "story",
        "question",
        "options",
        "correct_answer",
        "difficulty"
    ]

    for field in required_fields:

        if field not in quest:

            raise ValueError(
                f"Quest is missing required field: {field}"
            )

    # ==========================================
    # VALIDATE OPTIONS
    # ==========================================

    if not isinstance(quest["options"], list):
        raise ValueError("Quest options must be a list.")

    if len(quest["options"]) != 4:
        raise ValueError(
            "Quest must contain exactly four options."
        )

    # ==========================================
    # VALIDATE CORRECT ANSWER
    # ==========================================

    correct_answer = quest["correct_answer"]

    if not isinstance(correct_answer, int):
        raise ValueError(
            "correct_answer must be an integer index."
        )

    if correct_answer < 0 or correct_answer > 3:
        raise ValueError(
            "correct_answer must be between 0 and 3."
        )

    # ==========================================
    # NORMALIZE DIFFICULTY
    # ==========================================

    quest["difficulty"] = difficulty

    # ==========================================
    # RETURN CLEAN QUEST
    # ==========================================

    return {
        "story": quest["story"],
        "question": quest["question"],
        "options": quest["options"],
        "correct_answer": quest["correct_answer"],
        "difficulty": quest["difficulty"]
    }


# ==========================================
# QUICK TEST
# ==========================================

if __name__ == "__main__":

    sample_knowledge = (
        "As the letter A is the first of all letters, "
        "so the eternal God is first in the world. "
        "This is the opening verse of Thirukkural."
    )

    quest = create_quest(
        sample_knowledge,
        difficulty="easy"
    )

    print(
        json.dumps(
            quest,
            indent=2,
            ensure_ascii=False
        )
    )

