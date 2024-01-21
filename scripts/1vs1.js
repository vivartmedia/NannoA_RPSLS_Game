
// Game Rules Modal script Start--------------------
var rulesModal = document.getElementById("rulesModal");
var showRulesBtn = document.getElementById("showRulesBtn");
var span = document.getElementsByClassName("close")[0];

showRulesBtn.addEventListener("click", function () {
  rulesModal.style.display = "flex";
});

span.onclick = function () {
  rulesModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === rulesModal) {
    rulesModal.style.display = "none";
  }
};

let player1Choice = null;
let player2Choice = null;
let currentPlayer = 1;
let player1Wins = 0;
let player2Wins = 0;
// let gamesPlayed = 0;
let totalGamesNeeded = 0;
let disableImages = false;

let result;
let imageId;
var player1Images = document.querySelectorAll(".rotatable-image");
var player2Images = document.querySelectorAll(".rotatable-image2");

let singlePlayBtn = document.getElementById("singlePlayBtn");
let bestOfFiveBtn = document.getElementById("bestOfFiveBtn");
let bestOfSevenBtn = document.getElementById("bestOfSevenBtn");
let player1Picked = document.getElementById("player1Picked");
let player2Picked = document.getElementById("player2Picked")
let GameModeTxt = document.getElementById("GameModeTxt");
let winnerResult = document.getElementById("winnerResult");
let player1Score = document.getElementById("player1Score");
let player2Score = document.getElementById("player2Score");
let resetBtn = document.getElementById("resetBtn");
let updatePlayerTurnUI_ID = document.getElementById("updatePlayerTurnUI_ID");


singlePlayBtn.addEventListener("click", function () {
  playGame(1);
  disableImages = false;
  winnerResult.textContent = "Fight";
  updatePlayerTurnUI()
});
bestOfFiveBtn.addEventListener("click", function () {
  playGame(5);
  disableImages = false;
  winnerResult.textContent = "Fight";
  updatePlayerTurnUI()
});
bestOfSevenBtn.addEventListener("click", function () {
  playGame(7);
  disableImages = false;
  winnerResult.textContent = "Fight";
  updatePlayerTurnUI()
});

// activatingImg(totalGamesNeeded);
resetGame();


function playGame(totalGames) {
  //  resetGame();
  totalGamesNeeded = totalGames;

  if (totalGames !== undefined) {

    GameModeTxt.textContent = `Playing: Best of ${totalGames}`;
    singlePlayBtn.disabled = true;
    bestOfFiveBtn.disabled = true;
    bestOfSevenBtn.disabled = true;
  } else {
    singlePlayBtn.disabled = false;
    bestOfFiveBtn.disabled = false;
    bestOfSevenBtn.disabled = false;
  }
}


function handleImageClick(event) {
  if (currentPlayer === 1) {
    player1Choice = this.alt;
    player1Picked.textContent = "Player 1: " + player1Choice;
    currentPlayer = 2;
  } else {
    player2Choice = this.alt;
    player2Picked.textContent = "Player 2: " + player2Choice;
    currentPlayer = 1;

    // Check winner and update scores after both players have chosen
    let winner = checkWinner();
    winnerResult.textContent = winner;
    playersScores();
  }
  updatePlayerTurnUI(); // Update UI for next player's turn
}


function updatePlayerTurnUI() {
  if (currentPlayer === 1 && !disableImages) {
    updatePlayerTurnUI_ID.textContent = "Player 1 turn";
    player1Images.forEach(function (image) {
      image.addEventListener("click", handleImageClick);
      image.classList.add("rotatable-image-hover-click");
    });
    player2Images.forEach(function (image) {
      image.removeEventListener("click", handleImageClick);
      image.classList.remove("rotatable-image-hover-click");
    });

  } else if (currentPlayer === 2 && !disableImages) {
    updatePlayerTurnUI_ID.textContent = "Player 2 turn";
    player2Images.forEach(function (image) {
      image.addEventListener("click", handleImageClick);
      image.classList.add("rotatable-image-hover-click");
    });
    player1Images.forEach(function (image) {
      image.removeEventListener("click", handleImageClick);
      image.classList.remove("rotatable-image-hover-click");
    });

  }
  else if (disableImages && (totalGamesNeeded !== undefined)) {
    updatePlayerTurnUI_ID.textContent = "Press Reset";
    currentPlayer = 1;
  }
  else {
    updatePlayerTurnUI_ID.textContent = "select modes";
    currentPlayer = 1;
  }
}

function checkWinner() {

  if (player1Choice == player2Choice) {
    return "Draw!";
  } else if (player2Choice == "rock") {
    return player1Choice == "paper" || player1Choice == "spock" ? "Player 1 win!" : "Player 2 win!";
  } else if (player2Choice == "paper") {
    return player1Choice == "scissors" || player1Choice == "lizard" ? "Player 1 win!" : "Player 2 win!";
  } else if (player2Choice == "scissors") {
    return player1Choice == "rock" || player1Choice == "spock" ? "Player 1 win!" : "Player 2 win!";
  } else if (player2Choice == "lizard") {
    return player1Choice == "scissors" || player1Choice == "rock" ? "Player 1 win!" : "Player 2 win!";
  } else if (player2Choice == "spock") {
    return player1Choice == "lizard" || player1Choice == "paper" ? "Player 1 win!" : "Player 2 win!";
  }
}

function playersScores() {
  let result = checkWinner();
  if (result == "Player 1 win!") {
    player1Wins++;
    player1Score.textContent = player1Wins;
  } else if (result == "Player 2 win!") {
    player2Wins++;
    player2Score.textContent = player2Wins;
  }

  // gamesPlayed++;
  checkSeriesWinner();

  if (player1Wins > totalGamesNeeded / 2 || player2Wins > totalGamesNeeded / 2) {
    concludeSeries();
    disableImages = true;
  } else {
    disableImages = false;
  }
}
function concludeSeries() {
  let seriesWinner = player1Wins > player2Wins ? "Player 1" : "Player 2";
  winnerResult.textContent = `${seriesWinner} wins the series! Please Reset and choose mode again`;
  // Disable further play until game mode is reset
  player1Images.forEach(function (image) {
    image.classList.remove("rotatable-image-hover-click");
    image.removeEventListener("click", handleImageClick);
  });
  player2Images.forEach(function (image) {
    image.classList.remove("rotatable-image-hover-click");
    image.removeEventListener("click", handleImageClick);
  });

}

function checkSeriesWinner() {
  if (player1Wins > totalGamesNeeded / 2 || player2Wins > totalGamesNeeded / 2) {
    let seriesWinner = player1Wins > player2Wins ? "Player 1" : "Player 2";
    winnerResult.textContent = `${seriesWinner} wins the series!`;
    // Reset or update the UI as needed
  }
}

// Reset button
function resetGame() {
  // Reset game state variables
  player1Wins = 0;
  player2Wins = 0;
  // gamesPlayed = 0;
  totalGamesNeeded = 0;
  currentPlayer = 0;
  updatePlayerTurnUI();

  // Reset UI elements
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  winnerResult.textContent = "Please select one of the 3 game mode buttons bellow!";
  GameModeTxt.textContent = "Select a game Mode";
  updatePlayerTurnUI_ID.textContent = "Select Mode"

  // Re-enable game mode buttons
  singlePlayBtn.disabled = false;
  bestOfFiveBtn.disabled = false;
  bestOfSevenBtn.disabled = false;

  // Clear any previous game mode settings
  player1Images.forEach(function (image) {
    image.classList.remove("rotatable-image-hover-click");
    image.removeEventListener("click", handleImageClick);
  });
  player2Images.forEach(function (image) {
    image.classList.remove("rotatable-image-hover-click");
    image.removeEventListener("click", handleImageClick);
  });
}

// Attach the reset function to the reset button
resetBtn.addEventListener("click", function () {
  resetGame();
});
