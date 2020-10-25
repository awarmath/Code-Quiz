// Gathering HTML elements for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var quizoverDiv = document.getElementById("quizover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscore-container");
var highscoreDiv = document.getElementById("highscore-page");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-name");
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
function generateQuizQuestions(){
    quizoverDiv.style.display = "none";
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
    quizoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestions();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          alert("Time is up!");
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
    finalScoreEl.innerHTML = "Your final score was " + score + " out of " + Questions.length + "!";
}

// Save initials and score to local storage
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        displayMessage("Initials cannot be blank");
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
    quizoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
        
    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();

    }
    
});


// Clear high scores from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("p");
        var newScoreSpan = document.createElement("p");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Show high scores 
function showHighscore(){
    startQuizDiv.style.display = "none"
    quizoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clear scores from the board and local storage
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Sets all variables back to original to restart quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    quizoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// Check answer 
function checkAnswer(answer){
    correct = Questions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestions();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestions();
    }else{
        showScore();
    }
}

document.getElementById('')

// Button starts quiz and timer
startQuizButton.addEventListener("click",startQuiz);