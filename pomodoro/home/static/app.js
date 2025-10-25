// Defines functions for timers

/////////////// MAIN TIMER ////////////////////////
let mainTimer;
let mainSeconds = 0;
let mainMinutes = 50;
let mainHours = 0;
let mainIsTimerRunning = false;

const audio = new Audio('./static/ding-126626.mp3');

function startMainTimer() {
    if (!mainIsTimerRunning) {
        // Sync JS state with what's currently displayed in the DOM
        syncMainFromDisplay();
        mainTimer = setInterval(updateMainTimer, 1000);
        mainIsTimerRunning = true;
    }
}

function syncMainFromDisplay() {
    // Read displayed values (if template set them) and use them as the starting state
    const h = parseInt(document.getElementById('hours')?.innerText, 10);
    const m = parseInt(document.getElementById('minutes')?.innerText, 10);
    const s = parseInt(document.getElementById('seconds')?.innerText, 10);

    mainHours = Number.isFinite(h) ? h : mainHours;
    mainMinutes = Number.isFinite(m) ? m : mainMinutes;
    mainSeconds = Number.isFinite(s) ? s : mainSeconds;
}

function updateMainTimer() {
    /**
     * Count down watch by seconds, 
     * then nests countdown by minutes, 
     * then by hours.
     */
    mainSeconds--;

    if (mainSeconds < 0) {
        mainSeconds = 59;
        mainMinutes--;

        if (mainMinutes < 0){
            mainMinutes = 59;
            mainHours--;

            if (mainHours < 0) {
                clearInterval(mainTimer);
                timerComplete();
                return;
            }
        }
    }

    updateMainTimerDisplay();
}

function updateMainTimerDisplay() {
    const formattedMainHours = padTime(mainHours);
    const formattedMainMinutes = padTime(mainMinutes);
    const formattedMainSeconds = padTime(mainSeconds);

    document.getElementById('hours').innerText = formattedMainHours;
    document.getElementById('minutes').innerText = formattedMainMinutes;
    document.getElementById('seconds').innerText = formattedMainSeconds;
}

function timerComplete() {
    audio.play();
}

function pauseTimer() {
    clearInterval(mainTimer);
    mainIsTimerRunning = false;
}

function resetTimer() {
    clearInterval(mainTimer);
    mainIsTimerRunning = false;
    mainSeconds = 0;
    mainHours = 0;
    mainMinutes = 50;
    updateMainTimerDisplay();
}

function padTime(time) {
    // Always return a 2-character string (e.g. "05", "12")
    return String(time).padStart(2, '0');
}

////////// INDIVIDUAL TIMERS //////////////////

const timers = {};

function startITimer(timerId) {
    const initialHours = parseInt(document.getElementById(`hours${timerId}`).innerText) || 0;
    const initialMinutes = parseInt(document.getElementById(`minutes${timerId}`).innerText) || 0;
    const initialSeconds = parseInt(document.getElementById(`seconds${timerId}`).innerText) || 0;

    const totalSeconds = initialHours * 3600 + initialMinutes * 60 + initialSeconds;

    timers[timerId] = {
        timer: setInterval(() => updateITimer(timerId), 1000),
        isTimerRunning: true,
        hours: initialHours,
        minutes: initialMinutes,
        seconds: initialSeconds,
        totalSeconds: totalSeconds,
        progressBar: document.getElementById(`progressBar${timerId}`)
    };

    setProgressBarDuration(timerId, totalSeconds);
    updateITimerDisplay(timerId);
}

function setProgressBarDuration(timerId, duration) {
    const progressBar = timers[timerId]?.progressBar;
    if (!progressBar) return;
    progressBar.style.setProperty('--duration', duration + 's');
}

function updateITimer(timerId) {
    let timer = timers[timerId];

    // Check if the timer is running
    if (timer.isTimerRunning) {
        timer.seconds--;

        if (timer.seconds < 0) {
            timer.seconds = 59;
            timer.minutes--;

            if (timer.minutes < 0) {
                timer.minutes = 59;
                timer.hours--;

                if (timer.hours < 0) {
                    clearInterval(timer.timer);
                    timerComplete(timerId);
                    timer.isTimerRunning = false;
                    return;
                }
            }
        }

        updateITimerDisplay(timerId);
        updateProgressBar(timerId);
    }
}

function updateProgressBar(timerId) {
    let timer = timers[timerId];

    // Check if the timer is still running
    if (timer.isTimerRunning) {
        let remainingSeconds = timer.hours * 3600 + timer.minutes * 60 + timer.seconds;
        if (!timer.totalSeconds || timer.totalSeconds === 0) return;
        let progressPercentage = ((timer.totalSeconds - remainingSeconds) / timer.totalSeconds) * 100;
        if (timer.progressBar) timer.progressBar.style.width = `${progressPercentage}%`;
    }
}


function pauseITimer(timerId) {
    const timer = timers[timerId];

    if (timer.isTimerRunning) {
        clearInterval(timer.timer);
        timer.isTimerRunning = false;
    }
}

function resumeITimer(timerId) {
    const timer = timers[timerId];

    if (!timer.isTimerRunning) {
        timer.timer = setInterval(() => updateITimer(timerId), 1000);
        timer.isTimerRunning = true;
    }
}

function resetITimer(timerId) {
    const initialHours = parseInt(document.getElementById(`initialHours${timerId}`)?.innerText, 10) || 0;
    const initialMinutes = parseInt(document.getElementById(`initialMinutes${timerId}`)?.innerText, 10) || 0;
    const initialSeconds = parseInt(document.getElementById(`initialSeconds${timerId}`)?.innerText, 10) || 0;

    const timer = timers[timerId];
    if (!timer) return; // nothing to reset
    clearInterval(timer.timer);
    timer.isTimerRunning = false;
    timer.seconds = initialSeconds;
    timer.hours = initialHours;
    timer.minutes = initialMinutes;
    updateITimerDisplay(timerId);
}

function timerComplete(timerId) {
    const audio1 = new Audio('static/media/audio/ding-126626.mp3');
    console.log("Played...")
    audio1.play();
}

function updateITimerDisplay(timerId) {
    let timer = timers[timerId];
    const formattedHours = padTime(timer.hours);
    const formattedMinutes = padTime(timer.minutes);
    const formattedSeconds = padTime(timer.seconds);

    document.getElementById(`hours${timerId}`).innerText = formattedHours;
    document.getElementById(`minutes${timerId}`).innerText = formattedMinutes;
    document.getElementById(`seconds${timerId}`).innerText = formattedSeconds;
}