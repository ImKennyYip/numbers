const msg = new SpeechSynthesisUtterance();
msg.lang = "en-GB";
const NUMBER_LIMIT = 9999;
const DIGIT_LIMIT = String(NUMBER_LIMIT).length;
let digitCount = 0;
let randomNumber = "0";
let inputNumber = "";

const inputNumberDisplay = document.getElementById("input-number-display");
const incorrectDisplay = document.getElementById("incorrect");
const numberCount = document.getElementById("number-count");
const incorrectCount = document.getElementById("incorrect-count");

const listenButton = document.getElementById("listen-button");
const nextButton = document.getElementById("next-button");

const digitSound = new Audio("digit.wav");
const backspaceSound = new Audio("backspace.wav");
const incorrectSound = new Audio("incorrect.wav");
const correctSound = new Audio("correct.wav");

window.onload = function() {
    randomNumber = String(Math.floor(Math.random()*(NUMBER_LIMIT)));
    document.addEventListener("keyup", (e) => {
        console.log(e.code);
        console.log(e.key);
        if ("Digit0" <= e.code && e.code <= "Digit9" && digitCount < randomNumber.length) {
            inputNumber += e.key

            const digit = document.createElement("span");
            digit.innerText = e.key;
            digit.classList.add("digit");
            inputNumberDisplay.appendChild(digit);

            digitSound.play();
            digitCount++;
            incorrectDisplay.innerText = "";
        }
        else if (e.code == "Backspace" && digitCount > 0) {
            inputNumber = inputNumber.slice(0, -1);
            inputNumberDisplay.removeChild(inputNumberDisplay.lastChild);
            backspaceSound.play();
            digitCount--;
            incorrectDisplay.innerText = "";
        }
        else if (e.code == "Enter") {
            if (inputNumber == randomNumber) {
                correctSound.play();
                changeNumber();
                incorrectDisplay.innerText = "";
            }
            else {
                incorrectSound.play();
                incorrectDisplay.innerText = "INCORRECT";
                incorrectCount.innerText = Number(incorrectCount.innerText) + 1;
            }
        }
        else if (e.code == "Space") {
            readNumber();
        }
    });

    listenButton.addEventListener("click", readNumber);
    nextButton.addEventListener("click", changeNumber);
}

function readNumber() {
    if ('speechSynthesis' in window) {
        msg.text = String(randomNumber);
        window.speechSynthesis.speak(msg);
    }
    else {
        alert("Sorry, your browser does not support text to speech!");
    }
}

function changeNumber() {
    clearInputNumber();
    randomNumber = String(Math.floor(Math.random()*(NUMBER_LIMIT)));
    console.log(randomNumber);
    readNumber();
    numberCount.innerText = Number(numberCount.innerText) + 1;
}

function clearInputNumber() {
    inputNumber = "";
    digitCount = 0;
    while (inputNumberDisplay.firstChild) {
        inputNumberDisplay.removeChild(inputNumberDisplay.lastChild);
    }
}
