let timerD = document.getElementById("timerDiv");
let stopwatchD = document.getElementById("stopwatchDiv");
let clockD = document.getElementById("clockDiv");
let tText = document.getElementById("timeText");
let active = "";
let clockIntervalId = undefined;
let stopwatchIntervalId = undefined;


s = 0;

// clockButton();
stopwatchButton();

function clockButton(){
    if(active == "clock") return;

    timerD.style.display = "none";
    stopwatchD.style.display = "none";
    clockD.style.display = "block";
    active = "clock";

    clockIntervalId = setInterval(function (){

        d = new Date();
        st = String(d.getSeconds());
        mt = String(d.getMinutes());
        ht = String(d.getHours());

        s++;
        tText.innerHTML = (ht%12 == 0 ? 12 : ht%12) + ":" + mt.padStart(2, "0") + ":" + st.padStart(2, "0");
    }, 1000);
}

function stopwatchButton(){
    if(active == "stopwatch") return;

    timerD.style.display = "none";
    stopwatchD.style.display = "block";
    clockD.style.display = "none";
    active = "stopwatch";
    clearInterval(clockIntervalId);
}

function timerButton(){
    if(active == "timer") return;

    timerD.style.display = "block";
    stopwatchD.style.display = "none";
    clockD.style.display = "none";
    active = "timer";
    clearInterval(clockIntervalId);
}



let sText = document.getElementById("stopwatchText");
let sStartStopButton = document.getElementById("startStopButton");
let sResetButton = document.getElementById("resetButton");
let sMarkupButton = document.getElementById("markupButton");
let lapTable = document.getElementById("lapTable");
let stopwatchState = "Start";
let sec = 0;

let laps = document.getElementById("laps");

document.addEventListener("DOMContentLoaded", function() {
    sText.parentNode.insertBefore(laps, sText.nextSibling);
});

function stopwatchStartStop(){
    sStartStopButton.innerHTML = "<b>" + stopwatchState + "</b>";
    if(stopwatchState == "Resume"){
        clearInterval(stopwatchIntervalId);
        sResetButton.style.color = "rgba(0,0,0,1)";
        stopwatchState = "Pause";
    } 
    else
    {
        if(stopwatchState == "Start"){
            sMarkupButton.style.display = sResetButton.style.display = "inline";
            sStartStopButton.innerHTML = "<b>Pause</b>"
        }
        stopwatchIntervalId = setInterval(()=>{
            sec = sec + 0.01;
            let min = String(Math.floor(sec/60));
            let hr = String(Math.floor(min/60));
            let secs = String(Math.floor(sec)%60).padStart(2, "0") + "." + String(Math.floor((sec - Math.floor(sec)) * 100)).padStart(2, "0")
            sText.innerHTML = hr + ":" + min.padStart(2, "0") + ":" + secs;
        }, 10);
        sResetButton.style.color = "rgba(0,0,0,0.3)";
        stopwatchState = "Resume";
    }
}


let totalMarkup = 0;

function stopwatchMarkup(){
    totalMarkup++;
    let lap = document.createElement("tr");
    lap.innerHTML = "<td>" + totalMarkup + "</td>" + "<td>" + sText.innerHTML + "</td>";
    lapTable.append(lap);
}

function stopwatchReset(){
    if(stopwatchState == "Pause") {
        totalMarkup = 0;
        stopwatchState = "Start";
        sMarkupButton.style.display = sResetButton.style.display = "none";
        sStartStopButton.innerHTML = "<b>Start</b>";
        sText.innerHTML = "00:00:00";
        lapTable.innerHTML = "<th>Lap</th> <th>Total time</th>"
        sec = 0;
    }
}

// timer

let countdown;
let totalSeconds = 0;
let isRunning = false;

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerText = document.getElementById("timerText");
const timerInputs = document.getElementById("timerInputs");

function updateDisplay() {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    timerText.innerHTML = hrs + ":" + mins + ":" + secs; 
}

function startTimer() {
    if (!isRunning) {
        timerInputs.style.display = "none";
        timerText.style.display = "inline-block";
        const hrs = parseInt(hoursInput.value) || 0;
        const mins = parseInt(minutesInput.value) || 0;
        const secs = parseInt(secondsInput.value) || 0;
        totalSeconds = (hrs * 3600) + (mins * 60) + secs;
        
        if (totalSeconds > 0) {
            isRunning = true;
            countdown = setInterval(() => {
                if (totalSeconds <= 0) {
                    clearInterval(countdown);
                    alert("Time's up!");
                    isRunning = false;
                } else {
                    totalSeconds--;
                    updateDisplay();
                }
            }, 1000);
        }
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(countdown);
    }
}

function resetTimer() {
    timerInputs.style.display = "flex";
    timerText.style.display = "none";
    stopTimer();
    totalSeconds = 0;
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    updateDisplay();
}
