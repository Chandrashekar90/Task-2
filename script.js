let timer = 0;
let startTime;
let isRunning = false;
let laps = [];
let timerId;

function start() {
    if (isRunning) return; 
    isRunning = true;
    startTime = Date.now() - timer;
    timerId = setInterval(step, 10);
}

function stop() {
    if (!isRunning) return; 
    isRunning = false;
    clearInterval(timerId);
}

function reset() {
    stop(); 
    timer = 0; 
    laps = []; 
    updateDisplay();
    updateLaps(); 
}

function lap() {
    if (!isRunning) return; 
    const lapTime = getFormattedTime(timer);
    laps.push(lapTime);
    updateLaps();
}

function step() {
    timer = Date.now() - startTime;
    updateDisplay();
}

function getFormattedTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const hundreds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundreds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    const display = document.getElementById('stopwatch');
    display.textContent = getFormattedTime(timer);
}

function updateLaps() {
    const lapList = document.getElementById('laps');
    lapList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `${index + 1}. ${lap}`;
        lapList.appendChild(lapItem);
    });
}

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', stop);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);
