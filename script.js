const { ipcRenderer } = require('electron');

const focusTime = 25*60;
const breakTime = 5*60;
const largeBreak = 15*60;

const alarmSound = new Audio('assets/sound/timer.wav');

const finishButtons = document.querySelectorAll('.finishButton');

const breakPhrases = [
    "Rest undder the cherry blossoms",
    "Even blossoms need rest",
    "Let your mind drift like falling petals",
    "Breat, you are doing great",
    "Sip some tea and enjoy the petals"
]

let time = 0;
let intervalo = null;
let focusCount = 0;
let totalFocusTime = 0;
let isPaused = false;
let currentPhase = "focus"; // "focus" | "break" | "longBreak"


const sakuraImg = document.getElementById("sakuraImg");

const totalFrames = 5;
let currentFrame = 1;
let animInterval = null;

document.getElementById('pauseButton').style.backgroundImage = `url('assets/buttons/PauseButton.png')`;

function startSakuraAnimation() {
    if (animInterval) return;   // 🔒 evita duplicados 
    animInterval = setInterval(() => {
        currentFrame++;
        if (currentFrame > totalFrames) currentFrame = 1;

        sakuraImg.src = `assets/sakura/${String(currentFrame).padStart(2,"0")}.png`;
    }, 200);
}

function stopSakuraAnimation(finalFrame = 5) {
    clearInterval(animInterval);
    animInterval = null;   // 🔥 importante
    sakuraImg.src = `assets/sakura/${String(finalFrame).padStart(2,"0")}.png`;
}


function startTimer(){
    document.getElementById('StartPage').style.display = 'none';
    document.getElementById("sakura").style.display = 'flex';
    document.getElementById('TimerPage').style.display = 'flex';
    focusCount = 1;
    totalFocusTime = 0;

    document.getElementById("countdown").textContent =
    `${Math.floor(focusTime / 60).toString().padStart(2, "0")}:${(focusTime % 60).toString().padStart(2, "0")}`;

    setTimeout(()=>{
        currentFrame = 1;
        startSakuraAnimation();
        Timer(focusTime);
        currentPhase = "focus";
    }, 100);
};

function Timer(tiempo){
    if (intervalo) return; // evita múltiples intervalos

    time = tiempo;

    intervalo = setInterval(() =>{
        time--;
        
        if(currentPhase =="focus") totalFocusTime++;

        updateTime();
        if (time <= 0) {
            alarmSound.currentTime = 0;  // reinicia si estaba sonando
            alarmSound.play();
            clearInterval(intervalo);
            intervalo = null;
            stopSakuraAnimation(finalFrame = 5);
            if(currentPhase =="focus"){ 
                document.getElementById('TimerPage').style.display = 'none';
                document.getElementById('breakPhrase').textContent = breakPhrase();
                document.getElementById('BreakPage').style.display = 'flex';
                
                if(focusCount%4 != 0){
                    document.getElementById("countdown").textContent =
                    `${Math.floor(breakTime / 60).toString().padStart(2, "0")}:${(breakTime % 60).toString().padStart(2, "0")}`;
                    setTimeout(()=>{
                        currentFrame = 1;
                        startSakuraAnimation();
                        currentPhase = "break";
                        Timer(breakTime);
                    }, 100);
                }
                else{
                    document.getElementById("countdown").textContent =
                    `${Math.floor(largeBreak / 60).toString().padStart(2, "0")}:${(largeBreak % 60).toString().padStart(2, "0")}`;
                    setTimeout(()=>{
                        currentFrame = 1;
                        startSakuraAnimation();
                        currentPhase = "longBreak";
                        Timer(largeBreak);
                    }, 100);
                }
            } else if(currentPhase =="break" || currentPhase =="longBreak"){
                    document.getElementById('breakPhrase').style.display = 'none';
                    document.getElementById('breakButtons').style.display = 'flex';
            }
        }
    }, 1000);
};

function updateTime() {
    const minutos = Math.floor(time / 60);
    const segundos = time % 60;

    document.getElementById("countdown").textContent =
    `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}



function pauseTimer(){
    if (!intervalo) return;

    clearInterval(intervalo);
    intervalo = null;
    isPaused = true;
    stopSakuraAnimation(currentFrame); // o frame de pausa
}

function resumeTimer() {
    if (!isPaused) return;

    isPaused = false;
    startSakuraAnimation();
    Timer(time); // seguimos con el tiempo restante
}

function breakPhrase(){
    const index = Math.floor(Math.random() * breakPhrases.length);
    return breakPhrases[index];
}

function finishFocus(){
    document.getElementById('TimerPage').style.display = 'none';
    document.getElementById('sakura').style.display = 'none';
    document.getElementById('BreakPage').style.display = 'none';
    document.getElementById('breakButtons').style.display = 'none';
    document.getElementById('breakPhrase').style.display = 'flex';
    document.getElementById('FinishPage').style.display = 'flex';
    clearInterval(intervalo);
    intervalo = null

    const minutos = Math.floor(totalFocusTime / 60);
    const segundos = totalFocusTime % 60;
    document.getElementById("totalTime").textContent =
    `${minutos.toString().padStart(2, "0")} minutes and ${segundos.toString().padStart(2, "0")} seconds`;
}


document.getElementById("startButton").addEventListener('click', () => {
    startTimer();
});

finishButtons.forEach(button => {
    button.addEventListener('click', () =>{
        finishFocus();
    });
});

document.getElementById('againButton').addEventListener('click', () => {
    document.getElementById('TimerPage').style.display = 'flex';
    document.getElementById('BreakPage').style.display = 'none';
    document.getElementById('breakPhrase').style.display = 'flex';
    document.getElementById('breakButtons').style.display = 'none';
    focusCount++;
    setTimeout(()=>{
        currentFrame = 1;
        startSakuraAnimation();
        currentPhase = "focus";
        Timer(focusTime);
    }, 100);
});

document.getElementById('pauseButton').addEventListener('click', () => {
    if (intervalo) {
        pauseTimer();
        document.getElementById('pauseButton').style.backgroundImage = `url('assets/buttons/ContinueButton.png')`;
    } else {
        resumeTimer();
        document.getElementById('pauseButton').style.backgroundImage = `url('assets/buttons/PauseButton.png')`;
    }
});

document.getElementById('homeButton').addEventListener('click', () => {
    document.getElementById('StartPage').style.display = 'flex';
    document.getElementById('sakura').style.display = 'none';
    document.getElementById('FinishPage').style.display = 'none';
});

document.getElementById('closeButton').addEventListener('click', () => {
    ipcRenderer.send('close-app');
});

document.getElementById('minimizeButton').addEventListener('click', () => {
    ipcRenderer.send('minimize-app');
});

