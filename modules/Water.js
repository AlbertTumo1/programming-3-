const LivingCreature = require("./LivingCreature");

module.exports = class Water extends LivingCreature {
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
        let emptyCells = this.chooseCell(0);
        let newCell = this.random(this.chooseCell(0));
        let grassCell = this.random(this.chooseCell(1));

        if(grassCell) grassCell.energy++;
        if(emptyCells.length >= 2) this.energy++;
        
        if (newCell) {
            let water = new Water(newCell[0], newCell[1], this.index);
            waterArr.push(water);
            matrix[newCell[1]][newCell[0]] = 6;
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
            matrix[newY][newX] = 6
            this.x = newX
            this.y = newY
        }

        if (this.energy <= 5) {
            this.die();
        }
    }

    eat() {
        let lavaFood = this.random(this.chooseCell(7));

        if (lavaFood) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = lavaFood[0]
            let newY = lavaFood[1]
            matrix[lavaFood[1]][lavaFood[0]] = 6;
            this.x = newX;
            this.y = newY;

            for (let i in lavaArr) {
                if (newX == lavaArr[i].x && newY == lavaArr[i].y) {
                    lavaArr.splice(i, 1);
                    break;
                }
            }
        }
        
        else {
            this.move()
        }
    }

    die() {
        for (let i in waterArr) {
            if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                waterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}