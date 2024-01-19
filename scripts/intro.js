document.addEventListener("DOMContentLoaded", function() {
    var playVsCpuButton = document.getElementById("playVsCpu");
    var play1v1Button = document.getElementById("play1v1");

    playVsCpuButton.addEventListener("click", function() {
        startGameVsCpu();
    });

    play1v1Button.addEventListener("click", function() {
        startGame1v1();
    });
});

function startGameVsCpu() {
    // Logic for playing against the CPU
    window.location.href = "./Pages/game.html";
    // You can add more code here to handle this mode
}

function startGame1v1() {
    // Logic for playing 1 vs 1
    window.location.href = "./Pages/game.html";
    // Add code here for 1 vs 1 gameplay
}
