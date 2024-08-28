const morseCode = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
};

let currentMorse = "";
let currentWord = "";
let currentText = "";
let startTime;
let endTime;
let letterTimer;
let wordTimer;

// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;

function startBeep() {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime); // 600 Hz beep
  oscillator.connect(audioContext.destination);
  oscillator.start();
}

function stopBeep() {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !e.repeat) {
    e.preventDefault();
    startTime = Date.now();
    clearTimeout(letterTimer);
    clearTimeout(wordTimer);
    startBeep();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    endTime = Date.now();
    const duration = endTime - startTime;

    stopBeep();

    if (duration < 250) {
      currentMorse += ".";
    } else {
      currentMorse += "-";
    }

    updateOutput();

    letterTimer = setTimeout(finishLetter, 1000);
    wordTimer = setTimeout(finishWord, 2000);
  }
});

function updateOutput() {
  document.getElementById("morseOutput").textContent =
    currentWord + currentMorse;
  document.getElementById("textOutput").textContent =
    currentText + (morseCode[currentMorse] || "");
}

function finishLetter() {
  if (currentMorse) {
    currentWord += currentMorse + " ";
    currentText += morseCode[currentMorse] || "(?)";
    currentMorse = "";
    updateOutput();
  }
}

function finishWord() {
  if (currentWord) {
    currentWord += "/ ";
    currentText += " ";
    updateOutput();
  }
}
