
class PlayerState:
    """
    Tracks a single player's progress and performance.
    This gets updated after every challenge attempt.
    """

    def __init__(self):
        self.score = 0
        self.correct_streak = 0
        self.wrong_streak = 0
        self.total_attempts = 0
        self.difficulty = "easy"
        self.completed_quests = []

    def record_answer(self, was_correct: bool, quest_id: str = None):
        """
        Records the player's answer and updates their progress.
        """

        self.total_attempts += 1

        if was_correct:
            # Reward the player for a correct answer
            self.score += 10
            self.correct_streak += 1
            self.wrong_streak = 0

            # Store completed quest only once
            if quest_id and quest_id not in self.completed_quests:
                self.completed_quests.append(quest_id)

        else:
            # Reset correct streak after a wrong answer
            self.wrong_streak += 1
            self.correct_streak = 0

        # Adjust difficulty based on recent performance
        self._update_difficulty()

    def _update_difficulty(self):
        """
        Difficulty personalization rules:

        - 3 correct answers in a row increase difficulty.
        - 2 wrong answers in a row decrease difficulty.
        """

        levels = ["easy", "medium", "hard"]
        current_index = levels.index(self.difficulty)

        # Increase difficulty
        if self.correct_streak >= 3:
            if current_index < len(levels) - 1:
                self.difficulty = levels[current_index + 1]

            # Reset streak after checking for level change
            self.correct_streak = 0

        # Decrease difficulty
        elif self.wrong_streak >= 2:
            if current_index > 0:
                self.difficulty = levels[current_index - 1]

            # Reset streak after checking for level change
            self.wrong_streak = 0

    def needs_hint(self) -> bool:
        """
        Returns True if the player made a recent mistake.
        """

        return self.wrong_streak >= 1

    def get_state_summary(self) -> dict:
        """
        Returns the current player state.
        This data can be sent to the frontend.
        """

        return {
            "score": self.score,
            "difficulty": self.difficulty,
            "correct_streak": self.correct_streak,
            "wrong_streak": self.wrong_streak,
            "total_attempts": self.total_attempts,
            "completed_quests": self.completed_quests,
            "hint_available": self.needs_hint(),
        }


# Quick test when running this file directly
if __name__ == "__main__":
    player = PlayerState()

    answers = [True, True, True, False, False]

    for i, correct in enumerate(answers):
        player.record_answer(
            correct,
            quest_id=f"quest_{i + 1}"
        )

        print(
            f"After answer {i + 1} "
            f"({'✅' if correct else '❌'}):"
        )

        print(player.get_state_summary())
        print("-" * 50)

