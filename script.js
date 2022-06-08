var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

let btnSound = document.querySelector("#btnSound");

let resultNames = "";
let resultScore = "";

var slow = new Image();
var background = new Image();
var forwardground = new Image();
var piperUp = new Image();
var piperDown = new Image();
var finalImage = new Image();

const input = document.getElementById("input");
const text = document.getElementById("text");
const tableScore = document.getElementById("tableScore");
const btnStart = document.getElementById("btnStart");
const menuStart = document.getElementById("menu");
let btnRest = document.getElementById('btnRestart')
let canvas = document.querySelector(".canvas");

slow.src = "./img/slow2.png";
background.src = "./img/flappy_bird_bg.png";
forwardground.src = "./img/flappy_bird_fg.png";
piperUp.src = "./img/papeUp.png";
piperDown.src = "./img/Down11.png";
finalImage.src = "./img/final.png";

var fly = new Audio();
var score_audio = new Audio();
var final_audio = new Audio();
var score = 0;
fly.src = "./sound/fly.mp3";
score_audio.src = "./sound/score.mp3";
final_audio.src = "./sound/final.mp3";

function start(){
    menuStart.style = "display: none";
canvas.style = "display: flex";
input.style = "display: none";
tableScore.style = "display: none";
btnRest.style = "display: none";
text.style = "display: none";
final_audio.pause();
xPos = 20;
yPos = 75;
pipe[0] = {
    x : cvs.width,
    y : 0
}
draw();
}


btnStart.addEventListener('click', start);
btnRest.addEventListener('click',() => {start()});
btnSound.addEventListener('click', () => {
if(btnSound.value === "On"){
    btnSound.value = "Off";
    score_audio.volume = 0;
    final_audio.volume = 0;
    fly.volume = 0;
} else {
    btnSound.value = "On";
    score_audio.volume = 0.7;
    final_audio.volume = 0.9;
    fly.volume = 0.9;
}
});



gap = 140;
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
    moveUp()
    }
    })

function moveUp() {
    yPos -= 30;
    fly.play();
}    

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

var xPos = 20;
var yPos = 75;
var gravity = 1.2;
function draw() {
    ctx.drawImage(background, 0, 0);
    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(piperUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(piperDown, pipe[i].x, pipe[i].y + piperUp.height + gap);
        pipe[i].x--;
        if(pipe[i].x == -5) {
            score++;
            score_audio.play();
            }
        if(pipe[i].x == 70) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * piperUp.height) -piperUp.height
            });
        }
        if(xPos + (slow.width - 5) >= pipe[i].x
        && xPos <= pipe[i].x + piperUp.width
        && (yPos <= pipe[i].y + piperUp.height 
            || (yPos + 5) + (slow.height - 5) >= pipe[i].y + piperUp.height + gap) 
            || (yPos - 5) + (slow.height -5) >= cvs.height - forwardground.height) {
                final_audio.play();
                text.style = "display: block";
                text.innerHTML = `Ваш результат ${score}`;
                canvas.style = "display: none";
                input.style = "display: block";
                return 
                
        //   location.reload();
            }
            
    }

    ctx.drawImage(forwardground, 0, cvs.height - forwardground.height);
    ctx.drawImage(slow, xPos, yPos);
    yPos += gravity;
    requestAnimationFrame(draw);


    ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);
}

input.addEventListener("keydown",(e) => {
    if (e.keyCode === 13) {
   getResault(input.value, score) 
   input.style = "display: none;"
   tableScore.style = "display: table";
   btnRest.style = "display: block";
   let str = ` <tr>
   <th>
       Имя
   </th>
   <th>
       Очки
   </th>

</tr>`; 
tableScore.innerHTML = "";  
tableScore.insertAdjacentHTML("beforeend", str) ;
   resultNames.split("\n").forEach((element, index) => {
   str = `<tr><td>${element}</td><td>${resultScore.split("\n")[index]}</td></tr>`;
   tableScore.insertAdjacentHTML("beforeend", str) ;
   })
    }
    })

//finalImage.onload = draw;













function getLocalStorage() {
    if(localStorage.getItem('resultNames')) {
        const Names = localStorage.getItem('resultNames');
        resultNames = Names;
    }
    if(localStorage.getItem('resultScore')) {
        const Score = localStorage.getItem('resultScore');
        resultScore = Score;
    }
    
}

function getResault(userName = "User", userScore) {
    if(resultNames.split("\n").length !== resultScore.split("\n").length){
        resultNames = userName;
        resultScore = userScore;
    }
    else{
        let arrayNames = resultNames.split('\n');
        let arrayScore = resultScore.split('\n');
     if(arrayNames.length >= 10){
     arrayNames.shift();
     arrayScore.shift();    
    }
    arrayNames.push(userName);
    arrayScore.push(userScore);
    resultNames = arrayNames.join('\n');
    resultScore = arrayScore.join('\n');
    }
    }
    




function setLocalStorage() {
    localStorage.setItem('resultNames', resultNames);
    localStorage.setItem('resultScore', resultScore);
}


window.addEventListener('DOMContentLoaded', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);