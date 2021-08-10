const displaytime = document.getElementById("time")
const start = document.getElementById("startstop")
const reset = document.getElementById("reset")
const modeButton = document.getElementById("modeIcon")

mode = "dark";

let minutes = 0;
let seconds = 0;
let active = false;
let interval;

modeButton.addEventListener("click", function(){
    if (mode === "dark"){
        modeButton.className = modeButton.className.replace("far fa-sun","far fa-moon");
        document.body.style.background = "#f0f0f0";
        displaytime.style.color = "#000000";
        mode = "light";
    }
    else {
        modeButton.className = modeButton.className.replace("far fa-moon","far fa-sun");
        document.body.style.background =  "#101010";
        displaytime.style.color = "#EFEFEF";
        mode = "dark";
    }
})

reset.addEventListener("click",function(){
    clearInterval(interval);
    active = false;
    start.innerText = "Start";
    minutes = 0;
    seconds = 0;
    displaytime.innerText = "00:00";
})

start.addEventListener("click", function(){
    if (!active){
        if (minutes === 0 && seconds === 0){
            active = false;
            start.innerText = "Start";
        }
        else {
            active = true;
            start.innerText = "Pause";
            interval = setInterval(function(){updateTime()}, 1000);
        }
    }
    else {
        active = false;
        clearInterval(interval);
        start.innerText = "Start";
    }
})

function updateTime(){
    if (minutes > 0 || seconds > 0){
        seconds--;
        if (seconds < 0 && minutes > 0){
            minutes--;
            seconds = 59;
        }
        setTime();
    }
}

function setTime(){
    let time = "";
    if (minutes < 10){
        time = "0" + minutes + ":";
    }
    else {
        time = time + minutes + ":";
    }
    if (seconds < 10){
        time = time + "0" + seconds;
    }
    else {
        time = time + seconds;
    }
    displaytime.innerText = time;
    if (seconds <= 0 && minutes <= 0){
        clearInterval(interval);
        active = false;
        start.innerText = "Start";
    }
}

add.addEventListener("click",function(){
    seconds += 15;
    if (seconds >= 60){
        minutes = minutes + Math.floor(seconds/60);
        seconds = seconds % 60;
    }
    setTime();
})

subtract.addEventListener("click",function(){
    seconds -= 15;
    if (seconds < 0 && minutes > 0){
        minutes--;
        seconds = 60 + seconds;
    }
    if (seconds < 0 && minutes <= 0 ){
        seconds = 0;
    }
    setTime();
})

