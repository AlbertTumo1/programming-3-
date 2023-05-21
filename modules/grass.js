const LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        let newCell = this.random(this.chooseCell(0));

        console.log(newCell, this.multiply);
        if (this.multiply >= 3 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;  
        }
    }
}


