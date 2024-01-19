// first page js start
document.addEventListener("DOMContentLoaded", function() {
    var playVsCpuButton = document.getElementById("play1v1");
    var play1v1Button = document.getElementById("playVsCpu");

    playVsCpuButton.addEventListener("click", function() {
        startGameVsCpu();
    });

    play1v1Button.addEventListener("click", function() {
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

// getting API choice start

function GetData() {
    fetch("https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption")
        .then(response => response.text()) // Process the response as plain text
        .then(data => {
            console.log(data); // Log the data, which should be the word like "Rock"
            // You can inject this data into your program as needed
        })
        .catch(error => {
            console.error('Error fetching data:', error); // Handle any errors
        });
}

GetData();


// getting API choice End




const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".choiceImg");
let player;
let computer;
let result;

// Select all the image elements
// const choiceImgs = document.querySelectorAll(".choiceImg");

// choiceImgs.forEach(img => img.addEventListener("click", () => {
//     // Use the 'alt' attribute of the image
//     player = img.alt;
//     console.log("I am clicked");
//     computerTurn();
//     playerText.textContent = `Player: ${player}`;
//     computerText.textContent = `Computer: ${computer}`;
//     resultText.textContent = checkWinner();
// }));
// testing--------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    // Select all images
    var images = document.querySelectorAll(".rotatable-image");
    
    images.forEach(function(image) {
        var angle = 0; // Initial angle for each image

        image.addEventListener("click", function() {
            angle += 360; // Increase the angle by 360 degrees
            image.style.transform = 'rotate(' + angle + 'deg)'; // Apply the rotation to the clicked image
             console.log(image.alt);
        });
    });
});



// testing--------------------------------------------------------------------

function computerTurn(){

    const randNum = Math.floor(Math.random() * 3) + 1;

    switch(randNum){
      case 1:
        computer = "ROCK";
        break;
      case 2:
        computer = "PAPER";
        break;
      case 3:
        computer = "SCISSORS";
        break;
    }
}
function checkWinner(){
    if(player == computer){
      return "Draw!";
    }
    else if(computer == "ROCK"){
      return (player == "PAPER") ? "You Win!" : "You Lose!"
    }
    else if(computer == "PAPER"){
      return (player == "SCISSORS") ? "You Win!" : "You Lose!"
    }
    else if(computer == "SCISSORS"){
      return (player == "ROCK") ? "You Win!" : "You Lose!"
    }
}