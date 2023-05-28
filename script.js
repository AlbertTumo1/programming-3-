// Git add .
// Git commit -m "descripion"
// git push -u origin master

const side = 30;
const m = 16;
const n = 16;

let socket = io();

function setup() {
    frameRate(1);
    createCanvas(m * side, n * side);
    background('#acacac');
}

function drawing(data) {
    let matrix = data.matrix;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2){
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("black");
            } else if (matrix[y][x] == 5) {
                fill("purple");
            } else if (matrix[y][x] == 6) {
                fill("blue");
            } else if (matrix[y][x] == 7) {
                fill("orange");
            }
         
            rect(x * side, y * side, side, side);
        }
    }
}

function DisplayCounter(data) {
    let grassText = document.getElementById("display_grass");
    let grassEaterText = document.getElementById("display_grassEater");
    let predatorText = document.getElementById("display_predator");
    let enemyEaterText = document.getElementById("display_enemyEater");
    let kingEaterText = document.getElementById("display_kingEater");
    let LavaText = document.getElementById("display_Lava");
    let WaterText = document.getElementById("display_Water");

    grassText.innerText = `Grass Count: ${data.grassCount}`;
    grassEaterText.innerText = `Grass Eater Count: ${data.grassEaterCount}`;
    predatorText.innerText = `Predator Count: ${data.predatorCount}`;
    enemyEaterText.innerText = `enemyEater Count: ${data.enemyEaterCount}`;
    kingEaterText.innerText = `kingEater Count: ${data.kingEaterCount}`;
    LavaText.innerText = `Lava Count: ${data.lavaCount}`;
    WaterText.innerText = `Water Count: ${data.waterCount}`;
    console.log(data)
}

socket.on("matrix", drawing);
socket.on("player_counts", DisplayCounter);

// Add 2 Characters: Water and Fire
// Add 2 Weathers: summer and winter (during winter grass dies and moves slower) (during summer they grow and spread faster)
// Add 2 Events: raining, radiation