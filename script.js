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
                fill("blue");
            } else if (matrix[y][x] == 6) {
                fill("orange");
            }
         
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("matrix", drawing);

// Add 2 Characters: Water and Fire
// Add 2 Weathers: summer and winter (during winter grass dies and moves slower) (during summer they grow and spread faster)
// Add 2 Events: raining, radiation