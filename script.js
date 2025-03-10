const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"], answer: "Shakespeare" }
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

function loadQuestions() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach(option => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = option;
            input.addEventListener("change", saveProgress);
            const label = document.createElement("label");
            label.textContent = option;
            questionDiv.appendChild(input);
            questionDiv.appendChild(label);
        });
        questionsContainer.appendChild(questionDiv);
    });
    loadProgress();
}

function saveProgress() {
    const progress = {};
    questions.forEach((_, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected) progress[`question${index}`] = selected.value;
    });
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

function loadProgress() {
    const savedProgress = JSON.parse(sessionStorage.getItem("progress"));
    if (savedProgress) {
        Object.keys(savedProgress).forEach(key => {
            const input = document.querySelector(`input[name="${key}"][value="${savedProgress[key]}"]`);
            if (input) input.checked = true;
        });
    }
}

function submitQuiz() {
    let score = 0;
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && selected.value === q.answer) score++;
    });
    localStorage.setItem("score", score);
    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
}

submitButton.addEventListener("click", submitQuiz);

window.onload = () => {
    loadQuestions();
    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
        scoreDisplay.textContent = `Your last score was ${savedScore} out of 5.`;
    }
};
