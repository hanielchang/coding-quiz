var mainDisplay = document.querySelector('#main-display');
var scoreList = document.querySelector('#scores');
var scores = localStorage.getItem("scores");
var returnBtn = document.createElement("button");
var clearBtn = document.createElement("button");
var returnLink = document.createElement('a');
returnLink.href = "./index.html";

scores = JSON.parse(scores);

// loop through scores array
for (var i = 0; i < scores.length; i++) {
    var score = document.createElement("li");
    score.className = "score-item";
    score.textContent = scores[i];
    scoreList.appendChild(score);
}

returnBtn.textContent = "Go Back"
returnLink.appendChild(returnBtn);
mainDisplay.appendChild(returnLink);

clearBtn.textContent = "Clear high scores";
clearBtn.id = 'clear';
mainDisplay.appendChild(clearBtn);

// Event listeners
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    scoreList.innerHTML = '';
});
