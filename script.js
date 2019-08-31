// Variables

var easy = false;
var colors = paletteGen(6);
var goalColor = goalGen();
var goalDisplay = document.querySelector("#goalColorDisplay");
var statusDisplay = document.querySelector("#status");
var h1Display = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var resetButton = document.querySelector("#reset");
var easyMode = document.getElementsByClassName("hardMode");
var modeBtn = document.querySelectorAll(".mode")

// Initialize

function gameStart() {
    mainLoop();
    btnControl();
    goalDisplay.textContent = goalColor;
    resetButton.addEventListener("click", function () {
        resetGame(6);
    });
};

gameStart();

// Functions

function mainLoop() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function () {
            var pickedColor = this.style.backgroundColor;
            if (pickedColor === goalColor) {
                statusDisplay.textContent = "Correct!";
                changeColor(goalColor);
                resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                statusDisplay.textContent = "Try Again";
            }
        });
    };
}

function btnControl() {
    for (var i = 0; i < modeBtn.length; i++) {
        modeBtn[i].addEventListener("click", function () {
            modeBtn[0].classList.remove("selected");
            modeBtn[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                resetGame(3);
                for (var i = 0; i < easyMode.length; i++) {
                    easyMode[i].style.display = "none";
                }
                easy = true;
            } else {
                resetGame(6);
                easy = false;
                for (var i = 0; i < easyMode.length; i++) {
                    easyMode[i].style.display = "block";
                }
            }
        })
    };
}

function changeColor(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
        h1Display.style.backgroundColor = color;
    }
    if (easy) {
        for (var i = 0; i < easyMode.length; i++) {
            easyMode[i].style.display = "none";
        }
    };
};

function goalGen() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

function paletteGen(n) {
    var palette = [];
    for (i = 0; i < n; i++) {
        palette.push(colorGen());
    }
    return palette;
};

function colorGen() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
};

function resetGame(n) {
    colors = paletteGen(n);
    goalColor = goalGen();
    goalDisplay.textContent = goalColor;
    resetButton.textContent = "New Colors";
    h1Display.style.backgroundColor = "steelblue";
    statusDisplay.textContent = "";
    gameStart();
}