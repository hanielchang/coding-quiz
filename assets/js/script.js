var startQuiz = document.querySelector("#start");
var mainDisplay = document.querySelector("#quiz-box");
var curObj = 0;
var timerOn = false;
var timer;
var presentTime = 75;

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
    console.log(presentTime);

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

        // Store answers of current object from questionsAry into respective variables
        var ans1 = questionsAry[curObj].a0;
        var ans2 = questionsAry[curObj].a1;
        var ans3 = questionsAry[curObj].a2;
        var ans4 = questionsAry[curObj].a3;
        var answersAry = [ans1, ans2, ans3, ans4];

        // Initiate mainDisplay to blank, and then append question text
        mainDisplay.innerHTML = "";
        mainDisplay.appendChild(questionText);

        // Create button elements and append them with the proper text content from answersAry
        for (let index = 0; index < answersAry.length; index++) {
            var Button = document.createElement("button");
            Button.textContent = answersAry[index]
            Button.className = "a" + index;
            mainDisplay.appendChild(Button);

        }
    }
    else {
        clearTimeout(timer);
        quizOver();
    }
}

var checkAnswer = function (event) {
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
            presentTime = presentTime - 10;
            if (presentTime <= 0) {
                presentTime = 0;
                quizOver();
            }
            document.getElementById('timer').innerHTML = presentTime;
        }
    }
};

function quizOver() {
    mainDisplay.innerHTML = "";
    var done = document.createElement("h1");
    var score = document.createElement("p");
    var inputBox = document.createElement("input");
    var label = document.createElement("label");
    var submitBtn = document.createElement("button");
    var divBox = document.createElement("div");
    
    label.textContent = "Enter initials"
    done.textContent = "All done!";
    score.textContent = "Your final score is " + presentTime;
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    divBox.className = "flex-row";
    
    mainDisplay.appendChild(done);
    mainDisplay.appendChild(score);
    divBox.appendChild(label);
    divBox.appendChild(inputBox);
    divBox.appendChild(submitBtn);
    mainDisplay.appendChild(divBox);

}

// function writeMessage() {
//     console.log("Entered writeMessage");
//     var message = document.createElement("button");
//     console.log(message)
//     message.textContent = "Correct!";
//     mainDisplay.appendChild(message);
// }

// Event listeners
startQuiz.addEventListener("click", displayQuestion);
mainDisplay.addEventListener("click", checkAnswer);