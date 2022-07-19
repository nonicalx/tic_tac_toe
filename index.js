// get all needed elements from HTML
const tiles = Array.from(document.querySelectorAll(".tile"));

const playerDisplay = document.getElementById("player-display");

const resetBtn = document.querySelector("#reset");

const gameResult = document.querySelector(".game-result");

//variable to keep track of game play
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let isGameActive = true;

const PLAYER_O = "player o wins";
const PLAYER_X = "player x wins";
const TIE = "tie";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//to switch who the current player is
function changePlayer() {
  playerDisplay.classList.remove(`player-${currentPlayer}`);
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player-${currentPlayer}`);
}

//game result announcer
function getGameResult(type) {
  switch (type) {
    case PLAYER_O:
      gameResult.innerHTML = 'Player <b class="player-o">O</b> won';
      break;
    case PLAYER_X:
      gameResult.innerHTML = 'Player <b class="player-x">X</b> won';
      break;
    case TIE:
      gameResult.innerHTML = "It is a tie";
      break;

    default:
      gameResult.innerHTML = "";
      break;
  }
}

//valid final result of game
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    getGameResult(currentPlayer === "x" ? PLAYER_X : PLAYER_O);
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    getGameResult(TIE);
    isGameActive = false;
  }
}

//update board
function updateBoard(index) {
  board[index] = currentPlayer;
}

//to check where u want to put in x or o is free to be used
function isTileEmpty(tile) {
  if (tile.innerText === "x" || tile.innerHTML === "o") {
    return false;
  }
  return true;
}

//for click action on title
function userActionOnTile(tile, index) {
  if (isTileEmpty(tile) && isGameActive) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player-${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
}

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userActionOnTile(tile, index));
});

//reset game to initial state
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  if (currentPlayer === "o") {
    changePlayer();
  }
  isGameActive = true;
  gameResult.innerHTML = "";
  tiles.forEach((tile, index) => {
    tile.innerText = "";
    tile.classList.remove(`player-x`);
    tile.classList.remove(`player-o`);
  });
}

resetBtn.addEventListener("click", resetGame);
