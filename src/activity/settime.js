let countdown = document.getElementById("count-down");
let startButton = document.getElementById("start-button");
let pauseButton = document.getElementById("pause-button");

let startCountdown = 120;
countdown.textContent = startCountdown;

let intervalId;

 function startTimer() {
    if (startCountdown >= 0) {
        countdown.textContent = startCountdown;
        startCountdown-=2;
    }
    else 
        clearInterval(intervalId);
    if (startCountdown === 0) {
        countdown.textContent = "Time's up!";
    }

 }



 startButton.addEventListener("click", () => {
     intervalId = setInterval(startTimer, 1000);

     setTimeout(() => {
        clearInterval(intervalId);
        countdown.textContent = "Time's up!";

     }, 110000)
});

pauseButton.addEventListener("click", () => {
    clearInterval(intervalId);
});

 