// Git add .
// Git commit -m "descripion"
// git push -u origin master

const side = 50;
const grassArr = [];
const grassEaterArr = [];
const predatorArr = [];
const kingEaterArr = [];
const enemyEaterArr = [];

let myMatrix = [];
let socket = io();

const matrix = [];
const a = 16;
const b = 16;

function GeneratePlayers(count, character){
    let p = 0;
    while (p < count) {
        let k = Math.floor(random(0,a))
        let l = Math.floor(random(0,b))
        if(matrix[k][l] == 0){
            matrix[k][l] = character
        }
        p++;
    }
}

function setup() {
    createCanvas(myMatrix[0].length * side, myMatrix.length * side);
    background('#acacac');

    GeneratePlayers(80,1); // grass
    GeneratePlayers(12,2); // grass eater
    GeneratePlayers(14,3); // predator
    GeneratePlayers(2,4); // king eater
    GeneratePlayers(9,5); // enemy eater (eats only grassEater and Predator)

    
}

function drawing(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x]==2){
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("black");
            } else if (matrix[y][x] == 5) {
                fill("orange");
            }
         
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("initial", (data) => myMatrix = data);
socket.on("send_matrix", (data) => drawing(data));