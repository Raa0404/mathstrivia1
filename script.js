// Game variables
let player1Score = 0;
let player2Score = 0;
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 60;

// Preload Sound Effects
const correctSound = new Audio('clapping.mp3'); // Clapping sound for correct answers
const incorrectSound = new Audio('booing.mp3'); // Booing sound for incorrect answers
const tickTockSound = new Audio('tick-tock.mp3'); // Tick-tock sound for the last 3 seconds of the timer

// Question bank (Easy level)
const questions = [
    {
        question: "What is 8 + 4?",
        answers: { A: "12", B: "14", C: "10", D: "16" },
        correctAnswer: "A"
    },
    {
        question: "What is 5 × 7?",
        answers: { A: "35", B: "42", C: "30", D: "38" },
        correctAnswer: "A"
    },
    {
        question: "What is 16 ÷ 4?",
        answers: { A: "3", B: "4", C: "5", D: "6" },
        correctAnswer: "B"
    },
    {
        question: "What is 15 - 9?",
        answers: { A: "7", B: "6", C: "5", D: "8" },
        correctAnswer: "B"
    },
    {
        question: "What is 12 × 3?",
        answers: { A: "30", B: "36", C: "40", D: "28" },
        correctAnswer: "B"
    }
];

// Start the game
document.getElementById('start-game-btn').addEventListener('click', startGame);

function startGame() {
    const player1Name = document.getElementById('player1-name').value || "Player 1";
    const player2Name = document.getElementById('player2-name').value || "Player 2";
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.game-screen').style.display = 'flex';

    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        
        // Tick-tock sound for last 3 seconds
        if (timeLeft <= 3 && timeLeft > 0) {
            tickTockSound.play();
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').innerText = currentQuestion.question;
        document.getElementById('answer-a').innerText = currentQuestion.answers.A;
        document.getElementById('answer-b').innerText = currentQuestion.answers.B;
        document.getElementById('answer-c').innerText = currentQuestion.answers.C;
        document.getElementById('answer-d').innerText = currentQuestion.answers.D;

        // Add event listeners for answers
        document.getElementById('answer-a').onclick = () => checkAnswer('A');
        document.getElementById('answer-b').onclick = () => checkAnswer('B');
        document.getElementById('answer-c').onclick = () => checkAnswer('C');
        document.getElementById('answer-d').onclick = () => checkAnswer('D');
    } else {
        endGame();
    }
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer');
    answerButtons.forEach(button => {
        button.disabled = true; // Disable all buttons after selection
    });

    if (selectedAnswer === currentQuestion.correctAnswer) {
        document.getElementById('answer-' + selectedAnswer).style.backgroundColor = "green"; // Correct answer
        correctSound.play(); // Play clapping sound for correct answers
        if (currentQuestionIndex % 2 === 0) {
            player1Score += 10;
        } else {
            player2Score += 10;
        }
    } else {
        document.getElementById('answer-' + selectedAnswer).style.backgroundColor = "red"; // Wrong answer
        document.getElementById('answer-' + currentQuestion.correctAnswer).style.backgroundColor = "green"; // Highlight the correct answer
        incorrectSound.play(); // Play booing sound for incorrect answers
    }

    updateScores();
    setTimeout(() => {
        currentQuestionIndex++;
        resetAnswerButtons();
        showQuestion();
    }, 1000); // Wait 1 second before going to the next question
}

function resetAnswerButtons() {
    const answerButtons = document.querySelectorAll('.answer');
    answerButtons.forEach(button => {
        button.style.backgroundColor = ""; // Reset button colors
        button.disabled = false; // Enable buttons again for the next question
    });
}

function updateScores() {
    document.getElementById('player1-score').innerText = `Player 1: ${player1Score}`;
    document.getElementById('player2-score').innerText = `Player 2: ${player2Score}`;
}

function endGame() {
    document.querySelector('.game-screen').style.display = 'none';
    document.querySelector('.result-screen').style.display = 'flex';

    const winner = player1Score > player2Score ? "Player 1" : player1Score < player2Score ? "Player 2" : "No one";
    document.getElementById('winner').innerText = `${winner} Wins!`;
}

document.getElementById('restart-btn').addEventListener('click', () => location.reload());
