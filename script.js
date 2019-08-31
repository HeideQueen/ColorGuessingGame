// Variables

var colors = paletteGen(6);
var goalColor = goalGen();
var easy = false;
var goalDisplay = document.querySelector("#goalColorDisplay");
var statusDisplay = document.querySelector("#status");
var h1Display = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var easyMode = document.getElementsByClassName("hardMode");

// Functions

function changeColor(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
        h1Display.style.backgroundColor = color;
    }
    if (easy) {
        for (var i = 0; i < easyMode.length; i++) {
            easyMode[i].style.backgroundColor = "#232323";
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
    h1Display.style.backgroundColor = "#232323";
    gameStart();
}

// Display & Status

goalDisplay.textContent = goalColor;

// Buttons

resetButton.addEventListener("click", function () {
    resetGame(6);
    easy = false;
})

easyButton.addEventListener("click", function () {
    resetGame(3);
    for (var i = 0; i < easyMode.length; i++) {
        easyMode[i].style.backgroundColor = "#232323";
    }
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    easy = true;
})

hardButton.addEventListener("click", function () {
    resetGame(6);
    easy = false;
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");

})

// Main Loop

function gameStart() {
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
};

gameStart();