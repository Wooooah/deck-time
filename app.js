document.addEventListener("DOMContentLoaded", () => {

    // TIMER

    let duration = 600; // 10 minutes
    let timeRemaining = duration;
    let timerInterval = null;

    const timerDisplay = document.getElementById("timer");
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
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

    function pauseTimer() {

        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {

        clearInterval(timerInterval);
        timerInterval = null;

        timeRemaining = duration;

        updateDisplay();
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

    updateDisplay();

    // CARD DECK

let deck = [];
let cardsDrawn = 0;
let activeKeyChallenges = [];

function updateCardsRemaining() {
    document.getElementById("cardsRemaining").textContent = deck.length;
}

function selectGameChallenges() {

    const pool = [...keyChallenges];

    activeKeyChallenges = [];

    for (let i = 0; i < 4; i++) {

        if (pool.length === 0) break;

        const randomIndex =
            Math.floor(Math.random() * pool.length);

        activeKeyChallenges.push(
            pool.splice(randomIndex, 1)[0]
        );
    }
}

function createDeck() {

    deck = [...cards];

    cardsDrawn = 0;

    selectGameChallenges();

    updateCardsRemaining();

    document.getElementById("keyChallengeDisplay").innerHTML =
        "<h2>Key Challenge</h2><p>No key challenge yet.</p>";
}

function drawKeyChallenge() {

    if (activeKeyChallenges.length === 0) {

        document.getElementById("keyChallengeDisplay").innerHTML =
            "<h2>Key Challenge</h2><p>No challenges remaining.</p>";

        return;
    }

    const challenge = activeKeyChallenges.shift();

    document.getElementById("keyChallengeDisplay").innerHTML =
        "<h2>" + challenge.name + "</h2>" +
        "<p>" + challenge.description + "</p>";
}

function drawCard() {

    if (deck.length === 0) {

        document.getElementById("cardDisplay").innerHTML =
            "<h2>Deck Empty</h2><p>Reset the deck to continue.</p>";

        return;
    }

    const randomIndex = Math.floor(Math.random() * deck.length);

    const card = deck.splice(randomIndex, 1)[0];

    document.getElementById("cardDisplay").innerHTML =
        "<h2>" + card.name + "</h2>" +
        "<p>" + card.description + "</p>";

    updateCardsRemaining();

    cardsDrawn++;

    if (cardsDrawn % 12 === 0) {
        drawKeyChallenge();
    }
}

function resetDeck() {

    createDeck();

    document.getElementById("cardDisplay").innerHTML =
        "<h2>Deck Reset</h2><p>52 cards ready to draw.</p>";
}

document
    .getElementById("drawCardBtn")
    .addEventListener("click", drawCard);

document
    .getElementById("resetDeckBtn")
    .addEventListener("click", resetDeck);

createDeck();
});
