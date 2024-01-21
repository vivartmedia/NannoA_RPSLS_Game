
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
// let player1;
// let player2;

let player1Choice = null;
let player2Choice = null;
let currentPlayer = 1;
let player1Wins = 0;
let player2Wins = 0;
let gamesPlayed = 0;
let totalGamesNeeded = 0;

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
    updatePlayerTurnUI()
});
bestOfFiveBtn.addEventListener("click", function () {
    playGame(5);
    updatePlayerTurnUI()
});
bestOfSevenBtn.addEventListener("click", function () {
    playGame(7);
    updatePlayerTurnUI()
});

activatingImg(totalGamesNeeded);


function playGame(totalGames) {
    resetGame();
    totalGamesNeeded = totalGames;
    if (currentPlayer === 1) {
        player1Images.forEach(function (image) {
            image.addEventListener("click", handleImageClick);
            image.classList.add("rotatable-image-hover-click");
        });
        player2Images.forEach(function (image) {
            image.removeEventListener("click", handleImageClick);
            image.classList.remove("rotatable-image-hover-click");
        });
    } else if (currentPlayer === 2) {
        player1Images.forEach(function (image) {
            image.removeEventListener("click", handleImageClick);
            image.classList.remove("rotatable-image-hover-click");
        });
        player2Images.forEach(function (image) {
            image.addEventListener("click", handleImageClick);
            image.classList.add("rotatable-image-hover-click");
        });
    }


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

    } else {
        player1Images.forEach(function (image) {
            image.classList.remove("rotatable-image-hover-click");
        });
        player2Images.forEach(function (image) {
            image.classList.remove("rotatable-image-hover-click");
        });
        winnerResult.textContent =
            "Please pick one of the 3 game mode buttons bellow";
    }
}

function handleImageClick(event) {
    if (currentPlayer === 1) {
        player1Choice = this.alt;
        player1Picked.textContent = "player 1: " + player1Choice;
        //   Swith to player 2
        currentPlayer = 2;
        updatePlayerTurnUI();
        // Update the UI to indicate it's Player 2's turn
    } else {
        player2Choice = this.alt;
        player2Picked.textContent = "Player 2: " + player2Choice;
        playersScores();//now call playersSCores as both players have made choices
        currentPlayer = 1;
        updatePlayerTurnUI();
    }
}
function updatePlayerTurnUI() {
    if (currentPlayer === 1) {
        updatePlayerTurnUI_ID.textContent = "Player 1 turn";
    } else {
        updatePlayerTurnUI_ID.textContent = "Player 2 turn";
    }
}

function determineWinner(choice1, choice2) {
    // Implement the game logic to determine the winner
    // Return 'Player 1', 'Player 2', or 'Draw'
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
    if (result === "Player 1 win!") {
        player1Wins++;
        player1Score.textContent = `Player 1: ${player1Wins}`;
    } else if (result === "Player 2 win!") {
        player2Wins++;
        player2Score.textContent = `Player 2: ${player2Wins}`;
    }

    gamesPlayed++;
    checkSeriesWinner();

    if (player1Wins > totalGamesNeeded / 2 || player2Wins > totalGamesNeeded / 2) {
        concludeSeries();
    }
}
function concludeSeries() {
    let seriesWinner = player1Wins > player2Wins ? "Player" : "CPU";
    winnerResult.textContent = `${seriesWinner} wins the series! Please press reset button and choose mode again`;
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
    gamesPlayed = 0;
    totalGamesNeeded = 0;


    // Reset UI elements
    player1Score.textContent = "Player1 Wins: 0";
    player2Score.textContent = "Player2 Wins: 0";
    winnerResult.textContent = "Please pick one of the 3 game mode buttons bellow!";
    GameModeTxt.textContent = "Select a game Mode";

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
