const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast is a skill worth mastering.",
    "Race against time and win the challenge!",
    "Code your dreams into reality every day.",
    "Speed and accuracy lead to victory."
];

const startBtn = document.getElementById("start-btn");
const typingInput = document.getElementById("typing-input");
const sentenceDisplay = document.getElementById("sentence");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const car = document.getElementById("player-car");
const resultDiv = document.getElementById("result");
const finalWpm = document.getElementById("final-wpm");
const shareBtn = document.getElementById("share-btn");
const restartBtn = document.getElementById("restart-btn");

let currentSentence = "";
let startTime, timerInterval;

startBtn.addEventListener("click", startGame);
typingInput.addEventListener("input", handleTyping);
shareBtn.addEventListener("click", shareResult);
restartBtn.addEventListener("click", resetGame);

function startGame() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceDisplay.textContent = currentSentence;
    typingInput.value = "";
    typingInput.disabled = false;
    typingInput.focus();
    startBtn.classList.add("hidden");
    resultDiv.classList.add("hidden");
    car.style.left = "0px";

    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Time: ${elapsedTime}s`;

    const wordsTyped = typingInput.value.trim().split(" ").length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60) || 0;
    wpmDisplay.textContent = `WPM: ${wpm}`;
}

function handleTyping() {
    const typedText = typingInput.value;
    const progress = (typedText.length / currentSentence.length) * 100;
    car.style.left = `${Math.min(progress, 95)}%`; // Cap at 95% to not overlap finish line

    if (typedText === currentSentence) {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    typingInput.disabled = true;
    const elapsedTime = (Date.now() - startTime) / 1000;
    const wordsTyped = currentSentence.split(" ").length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60);
    finalWpm.textContent = `Your WPM: ${wpm}!`;
    resultDiv.classList.remove("hidden");

    // Celebration animation
    car.style.transition = "transform 0.5s";
    car.style.transform = "translateY(-50%) scale(1.5)";
    setTimeout(() => {
        car.style.transform = "translateY(-50%) scale(1)";
    }, 500);
}

function shareResult() {
    const wpm = finalWpm.textContent.split(" ")[2].slice(0, -1);
    const shareText = `🚀 I just typed at ${wpm} WPM in this crazy typing race! Can you beat me? 🏁 Try it now! [Insert game link]`;
    navigator.clipboard.writeText(shareText);
    alert("Score copied to clipboard! Share it with your friends!");
}

function resetGame() {
    startGame();
}

