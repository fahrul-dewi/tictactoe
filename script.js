document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const status = document.getElementById("status");
  const resetBtn = document.getElementById("reset-btn");
  const resetScoreBtn = document.getElementById("reset-score-btn");
  const playerX = document.getElementById("player-x");
  const playerO = document.getElementById("player-o");
  const scoreX = document.getElementById("score-x");
  const scoreO = document.getElementById("score-o");
  const scoreDraw = document.getElementById("score-draw");
  const currentScoreX = document.getElementById("current-score-x");
  const currentScoreO = document.getElementById("current-score-o");

  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;
  let scores = {
    x: 0,
    o: 0,
    draw: 0,
  };

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  // Initialize the game
  function initGame() {
    cells.forEach((cell) => {
      cell.classList.remove("x", "o", "winning-cell");
      cell.textContent = "";
    });

    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    status.textContent = `Player ${currentPlayer}'s turn`;
    updatePlayerTurn();
  }

  // Handle cell click
  function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
  }

  // Check game result
  function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];

      if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "")
        continue;

      if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
        roundWon = true;

        // Highlight winning cells
        cells[a].classList.add("winning-cell");
        cells[b].classList.add("winning-cell");
        cells[c].classList.add("winning-cell");
        break;
      }
    }

    if (roundWon) {
      status.textContent = `Player ${currentPlayer} wins!`;
      updateScore(currentPlayer);
      gameActive = false;

      // Auto-reset after 2 seconds
      setTimeout(initGame, 2000);
      return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
      status.textContent = "Game ended in a draw!";
      scores.draw++;
      updateScoreDisplay();
      gameActive = false;

      // Auto-reset after 2 seconds
      setTimeout(initGame, 2000);
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
    updatePlayerTurn();
  }

  // Update player turn indicator
  function updatePlayerTurn() {
    if (currentPlayer === "X") {
      playerX.classList.add("active");
      playerO.classList.remove("active");
    } else {
      playerO.classList.add("active");
      playerX.classList.remove("active");
    }
  }

  // Update score
  function updateScore(winner) {
    if (winner === "X") {
      scores.x++;
      currentScoreX.textContent = scores.x;
    } else {
      scores.o++;
      currentScoreO.textContent = scores.o;
    }
    updateScoreDisplay();
  }

  // Update score display
  function updateScoreDisplay() {
    scoreX.textContent = scores.x;
    scoreO.textContent = scores.o;
    scoreDraw.textContent = scores.draw;
  }

  // Reset scores
  function resetScores() {
    scores = {
      x: 0,
      o: 0,
      draw: 0,
    };
    updateScoreDisplay();
    currentScoreX.textContent = "0";
    currentScoreO.textContent = "0";
  }

  // Event listeners
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  resetBtn.addEventListener("click", initGame);
  resetScoreBtn.addEventListener("click", resetScores);

  // Initialize the game
  initGame();
});
