const LivingCreature = require("./LivingCreature");

module.exports = class Lava extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }

    getNewCoordinates(){
        this.directions = [
             [this.x - 1, this.y - 1],
             [this.x    , this.y - 1],
             [this.x + 1, this.y - 1],
             [this.x - 1, this.y    ],
             [this.x + 1, this.y    ],
             [this.x - 1, this.y + 1],
             [this.x    , this.y + 1],
             [this.x + 1, this.y + 1]
        ];
     }
     
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
        let newCell = this.random(this.chooseCell(2)) || this.random(this.chooseCell(3)) || this.random(this.chooseCell(4));
        if (newCell) {
            let Lava = new Lava(newCell[0], newCell[1], this.index);
            lavaArr.push(Lava);
            matrix[newCell[1]][newCell[0]] = 6;
        }
    }

    eat() {
        let grassEaterFoods = this.chooseCell(2);
        let predatorFoods = this.chooseCell(3);
        let kingEaterFoods = this.chooseCell(4);

        let grassEaterFood = this.random(grassEaterFoods);
        let predatorFood = this.random(predatorFoods);
        let kingEaterFood = this.random(kingEaterFoods);
        
        if (grassEaterFood) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let newX = grassEaterFood[0];
            let newY = grassEaterFood[1];
            matrix[grassEaterFood[1]][grassEaterFood[0]] = 6;
            this.x = newX;
            this.y = newY;

            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 15) {
                this.mul();
            }
            
        } else if(predatorFood) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let newX = predatorFood[0];
            let newY = predatorFood[1];
            matrix[predatorFood[1]][predatorFood[0]] = 6;
            this.x = newX;
            this.y = newY;

            for (let i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 11) {
                this.mul();
            }
        } else if(kingEaterFood) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let newX = kingEaterFood[0];
            let newY = kingEaterFood[1];
            matrix[kingEaterFood[1]][kingEaterFood[0]] = 6;
            this.x = newX;
            this.y = newY;

            for (let i in kingEaterArr) {
                if (newX == kingEaterArr[i].x && newY == kingEaterArr[i].y) {
                    kingEaterArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 11) {
                this.mul();
            }
        } 
        else {
            this.move();
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = this.random(emptyCells);
        this.energy--; 

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }

        if (this.energy <= 5) {
            this.die();
        }
    }

    die() {
        for (let i in lavaArr) {
            if (this.x == lavaArr[i].x && this.y == lavaArr[i].y) {
                lavaArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}