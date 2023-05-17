const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Grass = require("./Grass");
const GrassEater = require("./GrassEater");
const Predator = require("./predator");
const KingEater = require("./kingEater");
const EnemyEater = require("./enemyEater");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

grassArr = [];
grassEaterArr = [];
predatorArr = [];
kingEaterArr = [];
enemyEaterArr = [];

const matrix = [];

const a = 16;
const b = 16;

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

    return matrix;
}

function createCanvas() {
    function GenerateMatrix() {
        for (let i = 0; i < a; i++) {
            matrix.push([])
    
            for (let j = 0; j < b; j++) {
                matrix[i].push(0)
            }
        }

        return matrix;
    }

    GenerateMatrix();

    console.log(matrix)


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
            
        }
     }
}

createCanvas();

setInterval(() => {
    drawGame();
}, 1000);

io.on('connection', function(socket) {
    socket.emit("initial", matrix);
    socket.emit("send_matrix", matrix);
});

server.listen(3000, () => console.log("Server running on port 3000! COOL"));




