
// Game Rules Modal script Start--------------------
      var rulesModal = document.getElementById("rulesModal");
      var showRulesBtn = document.getElementById("showRulesBtn");
      var span = document.getElementsByClassName("close")[0];

      showRulesBtn.addEventListener("click", function () {
        console.log("concludeSeries kicked");
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


// implementing 3 different moeds 1 win, 3 out of 5, 4 out of 7 start
let player;
let computer;
let result;
let imageId;
var playerImages = document.querySelectorAll(".rotatable-image");

let singlePlayBtn = document.getElementById("singlePlayBtn");
let bestOfFiveBtn = document.getElementById("bestOfFiveBtn");
let bestOfSevenBtn = document.getElementById("bestOfSevenBtn");
let player1Picked = document.getElementById("player1Picked");
let player2Picked = document.getElementById("player2Picked")
let cpuPicked = document.getElementById("cpuPicked");
let GameModeTxt = document.getElementById("GameModeTxt");
let winnerResult = document.getElementById("winnerResult");
let player1Score = document.getElementById("player1Score");
let cpuScore = document.getElementById("cpuScore");
let resetBtn = document.getElementById("resetBtn")

singlePlayBtn.addEventListener("click", function () {
    //  console.log("win 1 clicked");
  playGame(1);
  winnerResult.textContent = "Fight";
  });
  bestOfFiveBtn.addEventListener("click", function () {
    playGame(5);
    winnerResult.textContent = "Fight";
  });
  bestOfSevenBtn.addEventListener("click", function () {
    playGame(7);
    winnerResult.textContent = "Fight";
  });

  let playerWins = 0;
  let computerWins = 0;
  let gamesPlayed = 0;
  let totalGamesNeeded = 0;
activatingImg(totalGamesNeeded);
  

function playGame(totalGames) {
   resetGame();
  totalGamesNeeded = totalGames;
  // console.log(totalGames)
playerImages.forEach(function (image) {
  image.addEventListener("click", handleImageClick);
  image.classList.add("rotatable-image-hover-click");
});
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



function activatingImg(e) {
  if (e > 0) {
    console.log(e);
    // playerImages.forEach(function (image) {
    //   image.addEventListener("click", handleImageClick);
    //   // image.classList.add("rotatable-image-hover-click");
    // });
  } else {
    playerImages.forEach(function (image) {
      image.classList.remove("rotatable-image-hover-click");
    });
    winnerResult.textContent =
      "Please select one of the 3 game mode buttons bellow";
  }
}

  function handleImageClick(event) {
    player = this.alt;
    GetData();
  }

function GetData() {
  fetch(
    "https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption"
  )
    .then((response) => response.text()) // Process the response as plain text
    .then((data) => {
        var angle = 0;
      computer = data.toLowerCase();
      // rotateCPUimg();
      player1Picked.textContent = "player: " + player;
      cpuPicked.textContent = "CPU: " + computer;
      winnerResult.textContent = checkWinner();
      // You can inject this data into your program as needed
      playersScores();
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // Handle any errors
    });
}

function checkWinner() {
  if (player == computer) {
    return "Draw!";
  } else if (computer == "rock") {
    return player == "paper" || player == "spock" ? "You Win!" : "You Lose!";
  } else if (computer == "paper") {
    return player == "scissors" || player == "lizard" ? "You Win!": "You Lose!";
  } else if (computer == "scissors") {
    return player == "rock" || player == "spock" ? "You Win!" : "You Lose!";
  } else if (computer == "lizard") {
    return player == "scissors" || player == "rock" ? "You Win!" : "You Lose!";
  } else if (computer == "spock") {
    return player == "lizard" || player == "paper" ? "You Win!" : "You Lose!";
  }
}

function playersScores() {
  let result = checkWinner();
  if (result === "You Win!") {
    playerWins++;
    player1Score.textContent = `Player Wins: ${playerWins}`;
  } else if (result === "You Lose!") {
    computerWins++;
    cpuScore.textContent = `CPU Wins: ${computerWins}`;
  }

  gamesPlayed++;
  if (
    playerWins > totalGamesNeeded / 2 || computerWins > totalGamesNeeded / 2
  ) {
    concludeSeries();
  }
}
function concludeSeries() {
  console.log("concludeSeries kicked");
  let seriesWinner = playerWins > computerWins ? "Player" : "CPU";
  winnerResult.textContent = `${seriesWinner} wins the series! Please press reset button and choose mode again`;
  // Disable further play until game mode is reset
  playerImages.forEach(function (image) {
    image.classList.remove("rotatable-image-hover-click");
    image.removeEventListener("click", handleImageClick);
  });
}




// Reset button
function resetGame() {
  // Reset game state variables
  playerWins = 0;
  computerWins = 0;
  gamesPlayed = 0;
  totalGamesNeeded =0;
 

  // Reset UI elements
  player1Score.textContent = "Player Wins: 0";
  cpuScore.textContent = "CPU Wins: 0";
  winnerResult.textContent ="Please select one of the 3 game mode buttons bellow!";
  GameModeTxt.textContent = "Select a game Mode";

  // Re-enable game mode buttons
  singlePlayBtn.disabled = false;
  bestOfFiveBtn.disabled = false;
  bestOfSevenBtn.disabled = false;

  // Clear any previous game mode settings
  playerImages.forEach(function (image) {
    image.classList.remove("rotatable-image-hover-click");
    image.removeEventListener("click", handleImageClick);
  });

  // Reattach event listeners (or reset other game settings as needed)
  // playerImages.forEach(function (image) {
    // image.addEventListener("click", handleImageClick);
    // image.classList.add("rotatable-image-hover-click");
  // });
}

// Attach the reset function to the reset button
resetBtn.addEventListener("click", function () {
  resetGame();
});
