// Danh sách 8 cặp emoji để tạo thành 16 thẻ bài
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

// Khai báo các biến trạng thái của game
let firstCard = null; // Thẻ thứ nhất được chọn
let secondCard = null; // Thẻ thứ hai được chọn
let lockBoard = false; // Khóa bảng khi đang so khớp 2 thẻ (ngăn click thêm)
let moves = 0; // Tổng số lượt chọn (mỗi lượt là lật 2 thẻ)
let matchedPairs = 0; // Số cặp thẻ đã ghép đúng thành công

// Lấy các phần tử DOM cần thiết
const gameBoard = document.getElementById("game-board");
const movesCountSpan = document.getElementById("moves-count");
const restartBtn = document.getElementById("restart-btn");
const winModal = document.getElementById("win-modal");
const finalMovesSpan = document.getElementById("final-moves");
const playAgainBtn = document.getElementById("play-again-btn");

// Hàm xáo trộn mảng ngẫu nhiên (Thuật toán Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Khởi tạo hoặc bắt đầu lại game
function initGame() {
  // 1. Reset các biến trạng thái logic
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matchedPairs = 0;

  // Cập nhật giao diện số lượt đi về 0
  movesCountSpan.textContent = "0";

  // 2. Ẩn Popup thắng cuộc (Win Modal) nếu đang mở
  winModal.classList.remove("show");

  // 3. Xóa sạch các thẻ cũ trên Board
  gameBoard.innerHTML = "";

  // 4. Xáo trộn danh sách emoji mới
  const shuffledEmojis = shuffle([...emojis]);

  // 5. Tạo các thẻ bài mới và thêm vào Board
  shuffledEmojis.forEach((emoji) => {
    const cardElement = createCardElement(emoji);
    gameBoard.appendChild(cardElement);
  });
}

// Tạo cấu trúc HTML cho một thẻ bài
function createCardElement(emoji) {
  // Tạo thẻ div bọc ngoài cùng (.card)
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji; // Lưu emoji vào dataset để đối chiếu khi so khớp

  // Tạo phần xoay 3D (.card-inner)
  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  // Tạo mặt trước (.card-front) hiển thị dấu ? khi úp bài
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.textContent = "?";

  // Tạo mặt sau (.card-back) hiển thị emoji khi lật bài
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.textContent = emoji;

  // Lắp ghép cấu trúc thẻ
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  // Gán sự kiện click để lật thẻ
  card.addEventListener("click", flipCard);

  return card;
}

// Hàm xử lý sự kiện click lật thẻ
function flipCard() {
  // Ngăn chặn lật thẻ nếu board bị khóa, hoặc click lại thẻ cũ, hoặc thẻ đã ghép đúng
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;

  // Hiển thị hiệu ứng lật (thêm class .flipped)
  this.classList.add("flipped");

  // Nếu chưa lật thẻ thứ nhất trong lượt này
  if (!firstCard) {
    firstCard = this;
    return;
  }

  // Nếu đã lật thẻ thứ nhất, gán thẻ vừa click là thẻ thứ hai
  secondCard = this;

  // Tăng số lượt chọn lên 1 và cập nhật màn hình
  moves++;
  movesCountSpan.textContent = moves;

  // Kiểm tra xem hai thẻ có trùng khớp hay không
  checkForMatch();
}

// So khớp hai thẻ đang mở
function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    // Ghép đúng -> Giữ mở hai thẻ
    disableCards();
  } else {
    // Ghép sai -> Úp lại hai thẻ sau 800ms
    unflipCards();
  }
}

// Khóa thẻ khi ghép đúng thành công
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matchedPairs++;
  resetSelection();

  // Kiểm tra xem đã thắng chưa (ghép đúng cả 8 cặp)
  if (matchedPairs === emojis.length / 2) {
    setTimeout(showWinModal, 500);
  }
}

// Úp hai thẻ lại khi ghép sai
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetSelection();
  }, 800);
}

// Reset lựa chọn thẻ cho lượt tiếp theo
function resetSelection() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Hiển thị popup thông báo chiến thắng
function showWinModal() {
  finalMovesSpan.textContent = moves;
  winModal.classList.add("show");
}

// Đăng ký sự kiện click cho các nút Restart và Play Again
restartBtn.addEventListener("click", initGame);
playAgainBtn.addEventListener("click", initGame);

// Tự động khởi tạo trò chơi khi trang web tải xong DOM
document.addEventListener("DOMContentLoaded", initGame);
