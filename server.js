const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Grass = require("./modules/Grass");
const GrassEater = require("./modules/GrassEater");
const Predator = require("./modules/predator");
const KingEater = require("./modules/kingEater");
const EnemyEater = require("./modules/enemyEater");
const Water = require("./modules/Water");
const Lava = require("./modules/Lava");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

grassArr = [];
grassEaterArr = [];
predatorArr = [];
kingEaterArr = [];
enemyEaterArr = [];
waterArr = [];
lavaArr = [];

matrix = [];

const a = 16;
const b = 16;

function GeneratePlayers(count, character){
    let p = 0;
    while (p < count) {
        let k = Math.floor(Math.random() * a)
        let l = Math.floor(Math.random() * b)
        if(matrix[k][l] == 0){
            matrix[k][l] = character
        }
        p++;
    }
}

function GenerateMatrix() {
    for (let i = 0; i < a; i++) {
        matrix.push([]);

        for (let j = 0; j < b; j++) {
            matrix[i].push(0)
        }
    }

    GeneratePlayers(100,1); // grass
    GeneratePlayers(20,2); // grass eater
    GeneratePlayers(17,3); // predator
    GeneratePlayers(6,4); // king eater
    GeneratePlayers(12,5); // enemy eater (eats only grassEater and Predator)
    GeneratePlayers(12,6); // water
    GeneratePlayers(10,7); // lava
    return matrix;
}

matrix = GenerateMatrix();
    
for(let y = 0; y < matrix.length; ++y){
    for(let x = 0; x < matrix[y].length; ++x){
        if(matrix[y][x] == 1){
            let grass = new Grass(x,y,1);
            grassArr.push(grass);
        }
        else if(matrix[y][x] == 2){
            let grassEater = new GrassEater(x,y,2)
            grassEaterArr.push(grassEater)
        } 
        else if(matrix[y][x] == 3){
            let predator = new Predator(x,y,3)
            predatorArr.push(predator);
        }  
        else if(matrix[y][x] == 4){
            let kingEater = new KingEater(x,y,4);
            kingEaterArr.push(kingEater);
        }  
        else if(matrix[y][x] == 5){
            let enemyEater = new EnemyEater(x,y,5);
            enemyEaterArr.push(enemyEater);
        }  
        else if(matrix[y][x] == 6){
            let water = new Water(x,y,6);
            waterArr.push(water);
        }  
        else if(matrix[y][x] == 7){
            let lava = new Lava(x,y,7);
            lavaArr.push(lava);
        }  
    }
}


function GetPlayerCounts() {
    let grassCount = grassArr.length
    let grassEaterCount = grassEaterArr.length
    let predatorCount = predatorArr.length
    let kingEaterCount = kingEaterArr.length
    let enemyEaterCount = enemyEaterArr.length
    let waterCount = waterArr.length
    let lavaCount = lavaArr.length

    let sendData = { grassCount, grassEaterCount, predatorCount, kingEaterCount, enemyEaterCount, waterCount, lavaCount };
    io.sockets.emit("player_counts", sendData)
}

function drawGame() {
    for(let i in grassArr){
        grassArr[i].mul();
    }

    for(let i in grassEaterArr) {
        grassEaterArr[i].eat();   
    }

    for(let i in predatorArr) {
        predatorArr[i].eat();   
    }

    for(let i in kingEaterArr) {
        kingEaterArr[i].eat();   
    }

    for(let i in enemyEaterArr) {
        enemyEaterArr[i].eat();   
    }

    for(let i in waterArr) {
        waterArr[i].mul();   
    }

    for(let i in lavaArr) {
        lavaArr[i].mul();   
    }

    let sendData = {
      matrix: matrix
    }

    io.sockets.emit("matrix", sendData)
}


setInterval(drawGame, 1000);
setInterval(GetPlayerCounts, 1000);

server.listen(3000, () => console.log("Server running on port 3000! COOL"));
