const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São paulo","Brasília", "Rio de Janeiro", "Salvador"],
        response: "Brasília"
    },
    {
        question: "Qual a linguagem usada para estilizar páginas web?",
        options: ["HTML", "Java","CSS","Python"],
        response: "CSS"
    },
    // Adicione mais perguntas conforme necessário
];

let questionIndex = 0;
let score = 0;
let currentTime = 30;
let timerInterval;

const btnStart = document.getElementById("btnStart");
const btnRestart = document.getElementById("btnRestart");
const beginning = document.getElementById("beginning");
const quiz = document.getElementById("quizContainer");
const result = document.getElementById("result");
const newQuestion = document.getElementById("newQuestion");
const answers = document.getElementById("answers");
const timer = document.getElementById("timer");
const scoreResult = document.getElementById("score");

btnStart.addEventListener("click", startQuiz);
btnRestart.addEventListener("click", restartQuiz);

function startQuiz() {
    beginning.style.display = "none";
    quiz.style.display = "block";
    questionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion(){
    resetTimer();
    const currentQuestion = questions[questionIndex];
    newQuestion.textContent = currentQuestion.question;
    answers.innerHTML = ""; //Limpa respostas anteriores

    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.addEventListener("click", () => selectAnswer(option));
        answers.appendChild(optionButton);
    });

    startTimer();
}

function selectAnswer(selectedOption){
    const correctAnswer = questions[questionIndex].response;
    if(selectedOption === correctAnswer){
        score++;
    }
    nextQuestion();
}

function nextQuestion(){
    clearInterval(timerInterval);
    questionIndex++;
    if(questionIndex < questions.length){
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult(){
    quiz.style.display = "none";
    result.style.display = "block";
    scoreResult.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;  
}

function startTimer(){
    currentTime = 30;
    timer.textContent = currentTime;
    timerInterval = setInterval(() =>{
        currentTime--;
        timer.textContent = currentTime;
        if(currentTime === 0){
            nextQuestion();
        }
    }, 1000);
}

function resetTimer(){
    clearInterval(timerInterval);
}

function restartQuiz(){
    result.style.display = "none";
    beginning.style.display = "block";
}


