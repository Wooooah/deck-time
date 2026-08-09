document.addEventListener("DOMContentLoaded", () => {

    let duration = 600;
    let timeRemaining = duration;
    let timerInterval = null;

    const timerDisplay = document.getElementById("timer");
    const startBtn = document.getElementById("startBtn");
    const resetBtn = document.getElementById("resetBtn");

    function updateDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        timerDisplay.textContent =
            `${minutes}:${seconds.toString().padStart(2, "0")}`;
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

    startBtn.addEventListener("click", startTimer);
    resetBtn.addEventListener("click", resetTimer);

    updateDisplay();
});
