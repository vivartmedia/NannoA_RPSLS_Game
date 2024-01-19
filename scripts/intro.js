// document.addEventListener("DOMContentLoaded", function() {
//     var playVsCpuButton = document.getElementById("playVsCpu");
//     var play1v1Button = document.getElementById("play1v1");

//     playVsCpuButton.addEventListener("click", function() {
//         startGameVsCpu();
//     });

//     play1v1Button.addEventListener("click", function() {
//         startGame1v1();
//     });
// });

// function startGameVsCpu() {
//     // Logic for playing against the CPU
//     window.location.href = "./Pages/game.html";
//     // You can add more code here to handle this mode
// }

// function startGame1v1() {
//     // Logic for playing 1 vs 1
//     window.location.href = "./Pages/game.html";
//     // Add code here for 1 vs 1 gameplay
// }
// ------------------------------------------------------------------------------------------------


const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceClick = document.querySelectorAll(".choiceClick");
let player;
let computer;
let result;
// DOMContentLoaded event to ensure the DOM is fully loaded before scripts run
document.addEventListener("DOMContentLoaded", function () {
    var playVsCpuButton = document.getElementById("playVsCpu");
    var play1v1Button = document.getElementById("play1v1");
    var singlePlayBtn = document.getElementById("singlePlayBtn");
    var bestOfFiveBtn = document.getElementById("bestOfFiveBtn");
    var bestOfSevenBtn = document.getElementById("bestOfSevenBtn");
    var images = document.querySelectorAll(".rotatable-image");

    playVsCpuButton.addEventListener("click", function () {
        startGameVsCpu();
    });

    play1v1Button.addEventListener("click", function () {
        startGame1v1();
    });

    singlePlayBtn.addEventListener("click", function () {
        playGame(1);
    });

    bestOfFiveBtn.addEventListener("click", function () {
        playGame(5);
    });

    bestOfSevenBtn.addEventListener("click", function () {
        playGame(7);
    });

    images.forEach(function (image) {
        image.addEventListener("click", handleImageClick);
    });
});

function startGameVsCpu() {
    window.location.href = "./Pages/playVsCpu.html";
}

function startGame1v1() {
    window.location.href = "./Pages/play1v1.html";
}

function playGame(totalGames) {
    resetGame();
    // Add logic for different game modes
}

function resetGame() {
    // Resetting game state
}

function handleImageClick() {
    this.style.transform = 'rotate(360deg)';
    player = this.alt.toLowerCase();
    GetData();
}

function GetData() {
    fetch("https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption")
        .then(response => response.text())
        .then(data => {
            computer = data.toLowerCase();
            console.log("player: " + player);
            console.log("CPU: " + computer);
            let winner = checkWinner();
            document.getElementById("winnerResult").textContent = winner;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function checkWinner() {
    if (player == computer) {
        return "Draw!";
    }
    else if (computer == "rock") {
        return (player == "paper" || player == "spock") ?  "You Win!" :  "You Lose!";
    }
    else if (computer == "paper") {
        return (player == "scissors") || player == "lizard" ? "You Win!" : "You Lose!"
    }
    else if (computer == "scissors") {
        return (player == "rock" || player == "spock") ? "You Win!" : "You Lose!"
    }
    else if (computer == "lizard") {
        return (player == "scissors" || player == "rock") ? "You Win!" : "You Lose!"
    }
    else if (computer == "spock") {
        return (player == "lizard" || player == "paper") ? "You Win!" : "You Lose!"
    }
}
// console.log("player " +player);
// console.log("CPU " +computer);
 GetData();

