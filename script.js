const { ipcRenderer } = require('electron');

const focusTime = 1*60;
const breakTime = 0.5*60;
const largeBreak = 0.75*60;

const finishButtons = document.querySelectorAll('.finishButton');

const breakPhrases = [
    "Rest undder the cherry blossoms",
    "Even blossoms need rest",
    "Let your mind drift like falling petals",
    "Breat, you are doing great",
    "Sip some tea and enjoy the petals"
]

let time = 0;
let intervalo;
let focusCount = 0;
let totalFocusTime = 0;


console.log("JS cargado");

const btn = document.getElementById("startButton");
console.log("Botón:", btn);

function startTimer(){
    document.getElementById('StartPage').style.display = 'none';
    document.getElementById("sakura").style.display = 'flex';
    document.getElementById('TimerPage').style.display = 'flex';
    focusCount = 1;
    totalFocusTime = 0;

    document.getElementById("countdown").textContent =
    `${Math.floor(focusTime / 60)}:${(focusTime % 60).toString().padStart(2, "0")}`;

    setTimeout(()=>{
        Timer(focusTime);
    }, 100);
};

function Timer(tiempo){
    time = tiempo;

    intervalo = setInterval(() =>{
        time--;
        
        if(tiempo == focusTime) totalFocusTime++;

        updateTime();
        if (time <= 0) {
            clearInterval(intervalo);
            switch(tiempo){
                case focusTime: 
                    document.getElementById('TimerPage').style.display = 'none';
                    document.getElementById('BreakPage').style.display = 'flex';
                    
                    if(focusCount%4 != 0){
                        document.getElementById("countdown").textContent =
                        `${Math.floor(breakTime / 60)}:${(breakTime % 60).toString().padStart(2, "0")}`;
                        setTimeout(()=>{
                            Timer(breakTime);
                        }, 100);
                    }
                    else{
                        document.getElementById("countdown").textContent =
                        `${Math.floor(largeBreak / 60)}:${(largeBreak % 60).toString().padStart(2, "0")}`;
                        setTimeout(()=>{
                            Timer(largeBreak);
                        }, 100);
                    }
                    break;
                case breakTime || largeBreak:
                    document.getElementById('againButton').style.display = 'flex';
                    document.getElementById('finishBreak').style.display = 'flex';
                    break;
            }
        }
    }, 1000);
};

function updateTime() {
    const minutos = Math.floor(time / 60);
    const segundos = time % 60;

    document.getElementById("countdown").textContent =
    `${minutos}:${segundos.toString().padStart(2, "0")}`;
}

function breakPhrase(){
    const index = Math.floor(Math.random() * breakPhrases.length);
    return breakPhrases[indice];
}

function finishFocus(){
    document.getElementById('TimerPage').style.display = 'none';
    document.getElementById('sakura').style.display = 'none';
    document.getElementById('BreakPage').style.display = 'none';
    document.getElementById('FinishPage').style.display = 'flex';

    const minutos = Math.floor(totalFocusTime / 60);
    const segundos = totalFocusTime % 60;
    document.getElementById("totalTime").textContent =
    `${minutos} minutes and ${segundos.toString().padStart(2, "0")} seconds`;
}


document.getElementById("startButton").addEventListener('click', () => {
    console.log("empezado");
    startTimer();
});

finishButtons.forEach(button => {
    button.addEventListener('click', () =>{
        console.log("terminado");
        finishFocus();
    });
});

document.getElementById('againButton').addEventListener('click', () => {
    document.getElementById('TimerPage').style.display = 'flex';
    document.getElementById('BreakPage').style.display = 'none';
    console.log("again");
    focusCount++;
    setTimeout(()=>{
        Timer(focusTime);
    }, 100);
});

document.getElementById('pauseButton').addEventListener('click', () => {
    console.log("pause");

});

document.getElementById('homeButton').addEventListener('click', () => {
    console.log("home");
    document.getElementById('StartPage').style.display = 'flex';
    document.getElementById('sakura').style.display = 'none';
    document.getElementById('FinishPage').style.display = 'none';
});

document.getElementById('closeButton').addEventListener('click', () => {
    console.log("close");
    ipcRenderer.send('close-app');
});

document.getElementById('minimizeButton').addEventListener('click', () => {
    console.log("minimize");
    ipcRenderer.send('minimize-app');
});

