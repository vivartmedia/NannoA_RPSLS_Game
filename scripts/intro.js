// first page js start
document.addEventListener("DOMContentLoaded", function () {
  var playVsCpuButton = document.getElementById("play1v1");
  var play1v1Button = document.getElementById("playVsCpu");

  playVsCpuButton.addEventListener("click", function () {
    startGameVsCpu();
  });

  play1v1Button.addEventListener("click", function () {
    startGame1v1();
  });
});

function startGameVsCpu() {
  // Logic for playing against the CPU
  window.location.href = "./Pages/play1v1.html";
  // You can add more code here to handle this mode
}

function startGame1v1() {
  // Logic for playing 1 vs 1
  window.location.href = "./Pages/play1vsCPU.html";
  // Add code here for 1 vs 1 gameplay
}
// first page js end------------------------------------------------------------

// implementing 3 different moeds 1 win, 3 out of 5, 4 out of 7 start
let GameModeTxt;
document.addEventListener("DOMContentLoaded", function () {
  let singlePlayBtn = document.getElementById("singlePlayBtn");
  let bestOfFiveBtn = document.getElementById("bestOfFiveBtn");
  let bestOfSevenBtn = document.getElementById("bestOfSevenBtn");
  GameModeTxt = document.getElementById("GameModeTxt");

  singlePlayBtn.addEventListener("click", function () {
    playGame(1);
  });
  bestOfFiveBtn.addEventListener("click", function () {
    playGame(5);
  });
  bestOfSevenBtn.addEventListener("click", function () {
    playGame(7);
  });
});

let pickedGame;
function playGame(totalGames) {
  resetGame();
  pickedGame = totalGames;
  document.getElementById("singlePlayBtn").style.display = "none";
  document.getElementById("bestOfFiveBtn").disabled = true;
  document.getElementById("bestOfSevenBtn").disabled = true;
  for (let i = 0; i < totalGames; i++) {
    console.log("ia m clicked");
  }
  if (pickedGame === 1) {
    GameModeTxt.textContent = "Playing Best of " + pickedGame;
  } else if (pickedGame === 5) {
    GameModeTxt.textContent = "Playing: 3 of " + pickedGame;
  } else {
    GameModeTxt.textContent = "Playing: 4 out of " + pickedGame;
  }
}
function resetGame() {
  console.log(pickedGame);
}

// implementing 3 different moeds 1 win, 3 out of 5, 4 out of 7 end

const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceClick = document.querySelectorAll(".choiceClick");
let player;
let computer;
let result;

// testing--------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  // Select all images
  var images = document.querySelectorAll(".rotatable-image");

  images.forEach(function (image) {
    var angle = 0; // Initial angle for each image

    image.addEventListener("click", function () {
      angle += 360; // Increase the angle by 360 degrees
      image.style.transform = "rotate(" + angle + "deg)"; // Apply the rotation to the clicked image

      player = image.alt;
      // console.log(player);
      function GetData() {
        fetch(
          "https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption"
        )
          .then((response) => response.text()) // Process the response as plain text
          .then((data) => {
            computer = data.toLowerCase();
            // rotateCPUimg();
            console.log("player: " + player);
            console.log("CPU:    " + computer);
            var imageId = "vs" + computer;
            document.getElementById(imageId).style.transform =
              "rotate(" + angle + "deg)";
            document.getElementById("winnerResult").textContent = checkWinner();
            // You can inject this data into your program as needed
          })
          .catch((error) => {
            console.error("Error fetching data:", error); // Handle any errors
          });
      }

      // Game Rules Modal script Start--------------------

      var rulesModal = document.getElementById("rulesModal");
      var showRulesBtn = document.getElementById("showRulesBtn");
      console.log("showRulesBtn");
      var span = document.getElementsByClassName("close")[0];

      showRulesBtn.addEventListener("click", function () {
        console.log("Im clickerd");
        rulesModal.style.display = "block";
      });

      span.onclick = function () {
        rulesModal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target === rulesModal) {
          rulesModal.style.display = "none";
        }
      };

      // Game Rules Modal script End--------------------
      function checkWinner() {
        if (player == computer) {
          return "Draw!";
        } else if (computer == "rock") {
          return player == "paper" || player == "spock"
            ? "You Win!"
            : "You Lose!";
        } else if (computer == "paper") {
          return player == "scissors" || player == "lizard"
            ? "You Win!"
            : "You Lose!";
        } else if (computer == "scissors") {
          return player == "rock" || player == "spock"
            ? "You Win!"
            : "You Lose!";
        } else if (computer == "lizard") {
          return player == "scissors" || player == "rock"
            ? "You Win!"
            : "You Lose!";
        } else if (computer == "spock") {
          return player == "lizard" || player == "paper"
            ? "You Win!"
            : "You Lose!";
        }
      }
      // console.log("player " +player);
      // console.log("CPU " +computer);
      GetData();
      // checkWinner();
    });
  });
});
