const container = document.getElementById("puzzle-container");
const shuffleBtn = document.getElementById("shuffle-btn");

const size = 4; // 4x4 puzzle
let emptyIndex = size * size - 1;
let pieces = [];

function createPuzzle() {
  container.innerHTML = "";
  pieces = [];
  for (let i = 0; i < size * size; i++) {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    if (i === emptyIndex) {
      piece.classList.add("empty");
      piece.textContent = "";
    } else {
      piece.textContent = i + 1;
    }
    piece.dataset.index = i;
    piece.addEventListener("click", () => movePiece(i));
    container.appendChild(piece);
    pieces.push(piece);
  }
}

function canMove(i) {
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;
  const pieceRow = Math.floor(i / size);
  const pieceCol = i % size;

  return (
    (pieceRow === emptyRow && Math.abs(pieceCol - emptyCol) === 1) ||
    (pieceCol === emptyCol && Math.abs(pieceRow - emptyRow) === 1)
  );
}

function movePiece(i) {
  if (!canMove(i)) return;
  pieces[emptyIndex].textContent = pieces[i].textContent;
  pieces[emptyIndex].classList.remove("empty");
  pieces[i].textContent = "";
  pieces[i].classList.add("empty");
  emptyIndex = i;

  if (checkSolved()) {
    alert("Congratulations! Puzzle solved!");
  }
}

function shuffle() {
  // Simple shuffle by random moves
  for (let i = 0; i < 1000; i++) {
    const neighbors = [];
    for (let j = 0; j < size * size; j++) {
      if (canMove(j)) neighbors.push(j);
    }
    const moveTo = neighbors[Math.floor(Math.random() * neighbors.length)];
    movePiece(moveTo);
  }
}

function checkSolved() {
  for (let i = 0; i < size * size - 1; i++) {
    if (pieces[i].textContent != i + 1) return false;
  }
  return true;
}

shuffleBtn.addEventListener("click", shuffle);

createPuzzle();
