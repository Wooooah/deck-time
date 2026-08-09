let duration = 600; // 10 minutes in seconds
let timeRemaining = duration;
let timerInterval = null;

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    document.getElementById("timer").textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        timeRemaining--;

        updateDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time is up!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    timeRemaining = duration;
    updateDisplay();
}

updateDisplay();
