var startQuiz = document.querySelector("#start");
var quizBox = document.querySelector("#quiz-box");
var mainDisplay = document.querySelector('#main-display');
var indicator = document.querySelector("#indicator");
var curObj = 0;
var timerOn = false;
var timer;
var presentTime = 75;
var scores = [];

var questionsAry = [
    {
        q1: 'Commonly used data types DO NOT include:',
        a0: 'strings',
        a1: 'booleans',
        a2: 'alerts',
        a3: 'numbers',
        CA: '.a2'
    },
    {
        q1: 'The condition in an if-else statement is enclosed with _______.',
        a0: 'quotes',
        a1: 'curly brackets',
        a2: 'parenthesis',
        a3: 'square brackets',
        CA: '.a1'
    },
    {
        q1: 'Arrays in javascript can be used to store _______.',
        a0: 'numbers and strings',
        a1: 'other arrays',
        a2: 'booleans',
        a3: 'all of the above',
        CA: '.a3'
    },
    {
        q1: 'String values must be enclosed within _______ when being assigned to variables.',
        a0: 'commas',
        a1: 'curly brackets',
        a2: 'quotes',
        a3: 'parenthesis',
        CA: '.a2'
    },
    {
        q1: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        a0: 'javascript',
        a1: 'terminal/bash',
        a2: 'for loops',
        a3: 'console.log',
        CA: '.a3'
    }
];


document.getElementById('timer').innerHTML = presentTime;


function startTimer() {
    presentTime = document.getElementById('timer').innerHTML;

    presentTime -= 1;
    if (presentTime < 0) {
        document.getElementById('timer').innerHTML = 0;
        presentTime = 0;
        return
    }

    if (presentTime === 0) {
        quizOver();
    }

    document.getElementById('timer').innerHTML = presentTime;
    timer = setTimeout(startTimer, 1000);
}

function displayQuestion() {
    if (timerOn === false) {
        startTimer();
        timerOn = true;
    }

    if (curObj <= questionsAry.length - 1) {
        var questionText = document.createElement("p");
        questionText.textContent = questionsAry[curObj].q1;

        // Initialize the indicator header (that says "correct" or "wrong answer") to blank
        indicator.textContent = '';
        if (curObj > 0) {
            indicator.textContent = 'Correct!';
        }

        // Store answers of current object from questionsAry into respective variables
        var ans1 = questionsAry[curObj].a0;
        var ans2 = questionsAry[curObj].a1;
        var ans3 = questionsAry[curObj].a2;
        var ans4 = questionsAry[curObj].a3;
        var answersAry = [ans1, ans2, ans3, ans4];

        // Initiate quizBox to blank, and then append question text
        quizBox.innerHTML = "";
        quizBox.appendChild(questionText);

        // Create button elements and append them with the proper text content from answersAry
        for (let index = 0; index < answersAry.length; index++) {
            var Button = document.createElement("button");
            Button.textContent = answersAry[index]
            Button.className = "a" + index;
            Button.id = "answer";
            quizBox.appendChild(Button);

        }
    }
    else {
        clearTimeout(timer);
        quizOver();
    }
}

var checkAnswer = function (event) {
    if (event.target.id === "answer") {
        var userInput = event.target;
        var correctAnswer = questionsAry[curObj].CA;
        if (userInput.className !== 'start' && presentTime > 0) {
            if (userInput.matches(correctAnswer)) {
                // writeMessage();
                curObj++;
                displayQuestion();
            }
            else {
                console.log("wrong answer!")
                indicator.textContent = 'wrong answer!';
                presentTime = presentTime - 10;
                if (presentTime <= 0) {
                    presentTime = 0;
                    quizOver();
                }
                document.getElementById('timer').innerHTML = presentTime;
            }
        }
    }
};

function quizOver() {
    quizBox.innerHTML = "";
    var done = document.createElement("h1");
    var scoreText = document.createElement("p");
    var inputBox = document.createElement("input");
    var label = document.createElement("label");
    var submitBtn = document.createElement("button");
    var divBox = document.createElement("div");



    label.textContent = "Enter initials"
    done.textContent = "All done!";
    scoreText.textContent = "Your final score is " + presentTime;
    submitBtn.type = "submit";
    submitBtn.id = "submit";
    submitBtn.textContent = "Submit";
    inputBox.id = 'text-box';
    divBox.className = "flex-row";

    // Enable the submit button to link directly to the high score page after being clicked
    var linkButton = document.createElement('a');
    linkButton.href = "./highscores.html"
    linkButton.appendChild(submitBtn);

    // Append all elements
    quizBox.appendChild(done);
    quizBox.appendChild(scoreText);
    divBox.appendChild(label);
    divBox.appendChild(inputBox);
    divBox.appendChild(linkButton);
    quizBox.appendChild(divBox);

    // scoreItem = createScoreItem();
    // scores.push(scoreItem);
}

var saveScores = function () {
    localStorage.setItem("scores", JSON.stringify(scores));
}

var loadScores = function () {
    var loadedScores = localStorage.getItem("scores");

    if (!loadedScores) {
        return false;
    }

    scores = JSON.parse(loadedScores);
}

function createScoreItem(event) {
    if (event.target.id === "submit") {
        var initials = document.getElementById("text-box").value;
        if (scores.length === 0) {
            var scoreString = '1. ' + initials + ' - ' + presentTime;
            scores.push(scoreString);
            saveScores();
            return;
        }

        var position = scores.length + 1;
        var scoreString = position + '. ' + initials + ' - ' + presentTime;
        scores.push(scoreString);
        saveScores();
        return;
    }
};

// function showScores(event) {
// if (event.target.id === "submit") {
// localStorage.setItem("value", presentTime);
// }
//     var scoreItem = document.createElement("li");
//     scoreItem.textContent = '1. ' + 'HC - ' + presentTime;
//     scoreList.appendChild(scoreItem);
// localStorage.setItem('scoreItem', scoreItem);
// };


// Event listeners
loadScores();
startQuiz.addEventListener("click", displayQuestion);
quizBox.addEventListener("click", checkAnswer);
mainDisplay.addEventListener("click", createScoreItem);
