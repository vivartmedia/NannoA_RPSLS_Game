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

// getting API choice start

// function GetData() {
//     fetch("https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption")
//         .then(response => response.text()) // Process the response as plain text
//         .then(data => {
//             console.log(data); // Log the data, which should be the word like "Rock"
//             // You can inject this data into your program as needed
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error); // Handle any errors
//         });
// }



// getting API choice End

// implementing 3 different moeds 1 win, 3 out of 5, 4 out of 7 start
document.addEventListener("DOMContentLoaded", function(){
    let singlePlayBtn = document.getElementById("singlePlayBtn");
    let bestOfFiveBtn = document.getElementById("bestOfFiveBtn");
    let bestOfSevenBtn = document.getElementById("bestOfSevenBtn");

    singlePlayBtn.addEventListener("click", function(){
        playGame(1);
    })
    bestOfFiveBtn.addEventListener("click", function(){
        playGame(5);
    })
    bestOfSevenBtn.addEventListener("click", function(){
        playGame(7);
    })
})

function playGame(totalGames){
    resetGame();

    for(let i = 0; i < totalGames; i++){
        console.log("ia m clicked")
    }
}
function resetGame(){

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
            image.style.transform = 'rotate(' + angle + 'deg)'; // Apply the rotation to the clicked image
            
            player = image.alt;
            // console.log(player);
            function GetData() {
                fetch("https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption")
                    .then(response => response.text()) // Process the response as plain text
                    .then(data => {

                        computer =data.toLowerCase();
                        console.log("player: " +player);
                        console.log("CPU:    " +computer);
                        let winner = checkWinner();
                      let resultElement= document.getElementById("winnerResult");
                         
                        resultElement.textContent = winner;


                        // console.log(computer); // Log the data, which should be the word like "Rock"
                        // You can inject this data into your program as needed
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error); // Handle any errors
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
            // checkWinner();
        });
    });
});



// testing--------------------------------------------------------------------


// function checkWinner() {
  
//     if (player == computer) {
//         console.log("Draw!");
//     }
//     else if (computer == "Rock") {
//         return (player == "Paper" || player == "Spock") ? console.log("You Win!") : console.log("You Lose!")
//     }
//     else if (computer == "Paper") {
//         return (player == "Scissors") || player == "Lizard" ? console.log("You Win!") : console.log("You Lose!")
//     }
//     else if (computer == "Scissors") {
//         return (player == "Rock" || player == "Spock") ? console.log("You Win!") : console.log("You Lose!")
//     }
//     else if (computer == "Lizard") {
//         return (player == "Scissors" || player == "Rock") ? console.log("You Win!") : console.log("You Lose!")
//     }
//     else if (computer == "Spock") {
//         return (player == "Lizard" || player == "Paper") ? console.log("You Win!") : console.log("You Lose!")
//     }
// }