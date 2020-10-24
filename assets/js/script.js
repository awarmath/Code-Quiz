// Gathering HTML elements for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var quizoverDiv = document.getElementById("quizover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


//add array with 5 questions
var Questions = [
    {
        question: "Inside which HTML element do we put the Javascript?",
        choiceA: "scripting",
        choiceB: "script",
        choiceC: "javacript",
        choiceD: "js",
        correctAnswer: "b"
    },
    {
        question: "How do you create a function in JavaScript?",
        choiceA: "function = myFunction()",
        choiceB: "function:myFunction()",
        choiceC: "function myFunction()",
        choiceD: "myFunction function()",
        correctAnswer: "c"
    },
    {
        question: "How do you call a function?",
        choiceA: "myFunction()",
        choiceB: "call function myFunction()",
        choiceC: "call myFunction()",
        choiceD: "Call my function()",
        correctAnswer: "a"
    },
    {
        question: "How do you round the number 7.25 to the nearest integer?",
        choiceA: "Math.rnd(7.25)",
        choiceB: "Math.round(7.25)",
        choiceC: "round(7.25)",
        choiceD: "rnd(7.25)",
        correctAnswer: "b"
    },
    {
        question: "How do you declare a JavaScript variable?",
        choiceA: "variable carName",
        choiceB: "v carName",
        choiceC: "var carName",
        choiceD: "var (carName)",
        correctAnswer: "c"
    },
];

//variables needed
var finalQuestionIndex = Questions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;


// Cycle through the questions
function generateQuizQuestion(){
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = Questions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start quiz and timer while hiding the opening html
function startQuiz(){
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Seconds left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

// display score at end of quiz
function showScore(){
    quizBody.style.display = "none"
    quizoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + Questions.length + " correct!";
}

// Check answer 
function checkAnswer(answer){
    correct = Questions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);