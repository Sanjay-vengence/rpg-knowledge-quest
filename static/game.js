// ==========================================
// RPG KNOWLEDGE QUEST - GAME.JS
// ==========================================


// ==========================================
// GAME STATE
// ==========================================

let score = 0;
let difficulty = "easy";
let correctStreak = 0;
let wrongStreak = 0;

let eliminatedOptions = [];
let currentQuest = null;
let isAnswering = false;


// ==========================================
// DOM ELEMENTS
// ==========================================

const storyText = document.getElementById("story-text");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultText = document.getElementById("result-text");

const resetBtn = document.getElementById("reset-btn");
const returnHomeBtn = document.getElementById("return-home-btn");

const scoreDisplay = document.getElementById("score-display");
const difficultyDisplay = document.getElementById("difficulty-display");


// ==========================================
// INITIALIZE GAME
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🎮 RPG Knowledge Quest initialized");

    if (
        !storyText ||
        !questionText ||
        !optionsContainer ||
        !resultText
    ) {
        console.error(
            "❌ Required game elements are missing from quest.html"
        );

        return;
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", resetGame);
    }

    if (returnHomeBtn) {
        returnHomeBtn.addEventListener("click", () => {
            window.location.href = "/";
        });
    }

    updateStats();
    fetchQuest();
});


// ==========================================
// UPDATE BACKGROUND IMAGE
// ==========================================

function updateBackground(data) {
    const topic = String(
        data.topic ||
        data.story ||
        ""
    ).toLowerCase();

    let imagePath = "/static/images/temple.jpg";

    /*
        Background mapping:

        First, second, third Kural  → Temple
        Fourth, fifth Kural         → Library
        Sixth, seventh, eighth      → Village
        Ninth, tenth Kural          → Forest
    */

    if (
        topic.includes("fourth") ||
        topic.includes("fifth")
    ) {
        imagePath = "/static/images/library.jpg";
    } else if (
        topic.includes("sixth") ||
        topic.includes("seventh") ||
        topic.includes("eighth")
    ) {
        imagePath = "/static/images/village.jpg";
    } else if (
        topic.includes("ninth") ||
        topic.includes("tenth")
    ) {
        imagePath = "/static/images/forest.jpg";
    }

    document.body.style.backgroundImage = `
        linear-gradient(
            rgba(20, 10, 5, 0.58),
            rgba(20, 10, 5, 0.58)
        ),
        url("${imagePath}")
    `;

    console.log("🖼️ Background changed to:", imagePath);
}


// ==========================================
// FETCH QUEST
// ==========================================

async function fetchQuest() {
    isAnswering = false;

    storyText.textContent = "📜 Loading your quest...";
    questionText.textContent = "";
    optionsContainer.innerHTML = "";
    resultText.textContent = "";
    resultText.className = "";
    resultText.style.color = "";

    try {
        const response = await fetch("/quest-data", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(
                `Quest request failed: ${response.status}`
            );
        }

        const data = await response.json();

        console.log("📜 Quest received:", data);

        currentQuest = data;

        updateBackground(data);

        const story =
            data.story ||
            data.scenario ||
            "Your adventure begins...";

        const question =
            data.question ||
            data.challenge_question ||
            data.challengeQuestion ||
            "Choose your answer:";

        storyText.textContent = story;
        questionText.textContent = question;

        // Ensure quest ID exists
        if (!currentQuest.id) {
            currentQuest.id =
                currentQuest.quest_id ||
                currentQuest.questId ||
                `quest_${Date.now()}`;
        }

        console.log(
            "🆔 Current quest ID:",
            currentQuest.id
        );

        displayOptions(data);

    } catch (error) {
        console.error("❌ Error loading quest:", error);

        storyText.textContent =
            "⚠️ Unable to load quest.";

        questionText.textContent = "";

        resultText.textContent =
            "Check whether FastAPI is running.";

        resultText.style.color = "orange";
    }
}


// ==========================================
// DISPLAY OPTIONS
// ==========================================

function displayOptions(data) {
    optionsContainer.innerHTML = "";

    const options =
        data.options ||
        data.choices ||
        data.answers ||
        [];

    if (!Array.isArray(options) || options.length === 0) {
        optionsContainer.innerHTML =
            "<p>⚠️ No options received from the server.</p>";

        return;
    }

    options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = option;

        if (eliminatedOptions.includes(index)) {
            button.disabled = true;
            button.classList.add("eliminated");

            button.textContent =
                `${option} 💡 (ruled out)`;
        } else {
            button.addEventListener("click", () => {
                submitAnswer(index);
            });
        }

        optionsContainer.appendChild(button);
    });
}


// ==========================================
// GET CORRECT ANSWER
// ==========================================

function getCorrectAnswer() {
    if (!currentQuest) {
        return null;
    }

    return (
        currentQuest.correct_answer ??
        currentQuest.correctAnswer ??
        currentQuest.answer ??
        currentQuest.correct_option ??
        currentQuest.correctOption ??
        currentQuest.correct_index ??
        currentQuest.correctIndex
    );
}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(selectedIndex) {
    const options =
        currentQuest.options ||
        currentQuest.choices ||
        currentQuest.answers ||
        [];

    const correctAnswer = getCorrectAnswer();

    console.log("Selected index:", selectedIndex);
    console.log("Correct answer:", correctAnswer);

    // New format: integer index
    if (typeof correctAnswer === "number") {
        return selectedIndex === correctAnswer;
    }

    // Numeric string format
    if (
        typeof correctAnswer === "string" &&
        /^\d+$/.test(correctAnswer.trim())
    ) {
        return selectedIndex === Number(
            correctAnswer.trim()
        );
    }

    // Older format: complete answer text
    if (typeof correctAnswer === "string") {
        const selectedOption = String(
            options[selectedIndex]
        ).trim();

        const expectedAnswer = correctAnswer.trim();

        return selectedOption === expectedAnswer;
    }

    console.warn(
        "⚠️ Could not identify correct answer format."
    );

    return false;
}


// ==========================================
// SUBMIT ANSWER
// ==========================================

async function submitAnswer(selectedIndex) {
    if (isAnswering) {
        console.log(
            "⏳ Answer submission already in progress."
        );

        return;
    }

    if (!currentQuest) {
        resultText.textContent =
            "⚠️ No quest is currently loaded.";

        return;
    }

    isAnswering = true;

    const buttons =
        optionsContainer.querySelectorAll(".option-btn");

    // Disable every option
    buttons.forEach((button) => {
        button.disabled = true;
    });

    const wasCorrect = checkAnswer(selectedIndex);

    const correctAnswer = getCorrectAnswer();

    // Highlight selected answer
    if (buttons[selectedIndex]) {
        if (wasCorrect) {
            buttons[selectedIndex].classList.add("correct");
        } else {
            buttons[selectedIndex].classList.add("wrong");
        }
    }

    // Reveal correct answer when the selected answer is wrong
    if (!wasCorrect && typeof correctAnswer === "number") {
        if (buttons[correctAnswer]) {
            buttons[correctAnswer].classList.add("correct");
        }
    }

    try {
        const questId =
            currentQuest.id ||
            currentQuest.quest_id ||
            currentQuest.questId;

        if (!questId) {
            throw new Error(
                "Quest ID is missing."
            );
        }

        const payload = {
            quest_id: String(questId),
            was_correct: Boolean(wasCorrect)
        };

        console.log(
            "📤 Payload being sent to backend:",
            payload
        );

        const response = await fetch("/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(
                `Answer request failed: ${response.status} - ${responseText}`
            );
        }

        const data = JSON.parse(responseText);

        console.log(
            "🧠 Answer result from backend:",
            data
        );

        const previousDifficulty = difficulty;

        // Update frontend state from backend
        score = data.score ?? score;

        difficulty =
            data.difficulty ?? difficulty;

        correctStreak =
            data.correct_streak ?? correctStreak;

        wrongStreak =
            data.wrong_streak ?? wrongStreak;

        // Show result message
        if (wasCorrect) {
            resultText.textContent =
                "✨ Correct! The ancient knowledge awakens.";

            resultText.className = "correct-message";
        } else {
            resultText.textContent =
                "❌ Incorrect. The inscription remains silent.";

            resultText.className = "wrong-message";
        }

        updateStats();

        if (difficulty !== previousDifficulty) {
            console.log(
                `⚔️ Difficulty changed from ${previousDifficulty} to ${difficulty}`
            );
        }

        // Load next quest after feedback
        setTimeout(() => {
            eliminatedOptions = [];
            fetchQuest();
        }, 1800);

    } catch (error) {
        console.error(
            "❌ Error submitting answer:",
            error
        );

        resultText.textContent =
            "⚠️ Could not submit answer. Check the console.";

        resultText.className = "error-message";

        // Re-enable buttons if submission fails
        buttons.forEach((button) => {
            button.disabled = false;
        });

        isAnswering = false;
    }
}


// ==========================================
// UPDATE PLAYER STATS
// ==========================================

function updateStats() {
    if (scoreDisplay) {
        scoreDisplay.textContent =
            `Score: ${score}`;
    }

    if (difficultyDisplay) {
        difficultyDisplay.textContent =
            `Difficulty: ${difficulty}`;
    }
}


// ==========================================
// RESET GAME
// ==========================================

async function resetGame(event) {
    if (event) {
        event.preventDefault();
    }

    if (isAnswering) {
        console.log(
            "⏳ Please wait for the current answer submission."
        );

        return;
    }

    console.log("🔄 Restart Journey clicked!");

    if (resetBtn) {
        resetBtn.disabled = true;
        resetBtn.textContent = "🔄 Restarting...";
    }

    try {
        const response = await fetch("/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(
                `Reset failed: ${response.status} - ${responseText}`
            );
        }

        const data = JSON.parse(responseText);

        console.log(
            "✅ Game reset response:",
            data
        );

        score = data.score ?? 0;
        difficulty = data.difficulty ?? "easy";

        correctStreak =
            data.correct_streak ?? 0;

        wrongStreak =
            data.wrong_streak ?? 0;

        eliminatedOptions = [];
        currentQuest = null;
        isAnswering = false;

        updateStats();

        resultText.textContent =
            "🔄 Journey restarted!";

        resultText.className = "";

        document.body.style.backgroundImage = `
            linear-gradient(
                rgba(20, 10, 5, 0.58),
                rgba(20, 10, 5, 0.58)
            ),
            url("/static/images/temple.jpg")
        `;

        await fetchQuest();

    } catch (error) {
        console.error("❌ Reset error:", error);

        resultText.textContent =
            "⚠️ Restart failed. Check the backend.";

        resultText.className = "error-message";

    } finally {
        if (resetBtn) {
            resetBtn.disabled = false;
            resetBtn.textContent = "🔄 Restart Journey";
        }

        isAnswering = false;
    }
}