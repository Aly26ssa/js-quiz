import { questions } from './data.js';

const questionElement = document.querySelector('.question');
const answerButtonsElement = document.querySelector('.answer__btns');
const nextButton = document.querySelector('.next__btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() { 
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    showQuestion();
}

function showQuestion() {
    answerButtonsElement.innerHTML = "";
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.className = "btn";
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    answerButtonsElement.querySelectorAll("button").forEach((button) => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
    });

    nextButton.style.display = "inline-block";
}

function showScore() {
    answerButtonsElement.innerHTML = "";
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    if (nextButton.textContent === "Play Again") {
        startQuiz();
    } else {
        currentQuestionIndex++;
        currentQuestionIndex < questions.length ? showQuestion() : showScore();
    }
});

startQuiz();