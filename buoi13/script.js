const emojis = [
  "🍎",
  "🍎",
  "🐱",
  "🐱",
  "🍋",
  "🍋",
  "🍓",
  "🍓",
  "🌸",
  "🌸",
  "🐶",
  "🐶",
  "⭐",
  "⭐",
  "🍀",
  "🍀",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

const gameBoard = document.getElementById("game-board");
const movesCountSpan = document.getElementById("moves-count");
const restartBtn = document.getElementById("restart-btn");
const winModal = document.getElementById("win-modal");
const finalMovesSpan = document.getElementById("final-moves");
const playAgainBtn = document.getElementById("play-again-btn");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matchedPairs = 0;
  movesCountSpan.textContent = "0";
  winModal.classList.remove("show");
  gameBoard.innerHTML = "";
  const shuffledEmojis = shuffle([...emojis]);
  shuffledEmojis.forEach((emoji) => {
    const cardElement = createCardElement(emoji);
    gameBoard.appendChild(cardElement);
  });
}

function createCardElement(emoji) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.textContent = "?";
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.textContent = emoji;
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;
  this.classList.add("flipped");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  moves++;
  movesCountSpan.textContent = moves;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  matchedPairs++;
  resetSelection();
  if (matchedPairs === emojis.length / 2) {
    setTimeout(showWinModal, 500);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetSelection();
  }, 800);
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function showWinModal() {
  finalMovesSpan.textContent = moves;
  winModal.classList.add("show");
}

restartBtn.addEventListener("click", initGame);
playAgainBtn.addEventListener("click", initGame);
document.addEventListener("DOMContentLoaded", initGame);
