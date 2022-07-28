export default class Checkboard {

    constructor(gridSize = null) {
        if (gridSize==null) {
            this.gridSize = 3
        } else {
            //make sure the type of input value is number
            this.gridSize = parseInt(gridSize);
        }
        this.grid = Array(this.gridSize)
                                .fill()
                                .map(()=>Array(this.gridSize).fill(0));
    }

    fillGrid(value,x,y) {
        if ((x >= this.gridSize) || (y >= this.gridSize)) {
            return false
        } 
        if(this.checkNonZero()===0) {
            return false
        }
        
        if(this.grid[x][y]){
            alert('Has already chosen! Pick another one!');
            return false
        }
        this.grid[x][y] = value;
        return true
    }

    checkNonZero() {
        var zeroCounter = 0;
        for(var i=0; i<this.gridSize;i++){
            for(var j=0; j<this.gridSize;j++){
                if (this.grid[i][j] === 0) {
                    zeroCounter += 1;
                }
            }
        }
        return zeroCounter
    }

    autofillPlayer(){
        var randomX= Math.floor(Math.random() * this.gridSize) ;
        var randomY = Math.floor(Math.random() * this.gridSize);
        if(!(this.grid[randomX][randomY]=== 0)){
            return this.autofillPlayer()
        } else {
            this.fillGrid(2, randomX, randomY);
            return [randomX, randomY]     
        }
    }



    checkWinner() {
        // if(this.checkNonZero()<4) return false;
        for(var i = 0; i < this.gridSize; i++) {
            for(var j=0; j < this.gridSize-2; j++) {
                if((this.grid[i][j]===this.grid[i][j+1])
                    &&(this.grid[i][j]===this.grid[i][j+2])
                    && this.grid[i][j]!==0) {
                        if(this.grid[i][j]===1){
                            return 1
                        } else return 2;
                }
            }
        }

        for(j = 0; j < this.gridSize; j++) {
            for(i=0; i < this.gridSize-2; i++) {
                if((this.grid[i][j]===this.grid[i+1][j])
                    &&(this.grid[i][j])===this.grid[i+2][j]
                    && this.grid[i][j]!==0) {
                        if(this.grid[i][j]===1){
                            return 1
                        } else return 2;
                }
            }
        }

        for(j = 0; j < this.gridSize - 2; j++) {
            for(i=0; i < this.gridSize-2; i++) {
                if((this.grid[i][j]===this.grid[i+1][j+1])
                    &&(this.grid[i][j]===this.grid[i+2][j+2]
                    && this.grid[i][j]!==0)) {
                        if(this.grid[i][j]===1){
                            return 1
                        } else return 2;
                }
            }
        }

        for(j = 0; j  < this.gridSize-2; j++) {
            for(i=this.gridSize-1; i >=2; i--) {
                if((this.grid[i][j]===this.grid[i-1][j+1])
                    &&(this.grid[i][j]===this.grid[i-2][j+2]
                    && this.grid[i][j]!==0)) {
                        if(this.grid[i][j]===1){
                            return 1
                        } else return 2;
                }
            }
        }
        return false
    }
}

// let gridCheckerboard = new Checkboard()
// gridCheckerboard.fillGrid(1,0,0)
// gridCheckerboard.fillGrid(2,1,0)
// gridCheckerboard.fillGrid(1,2,0)
// console.log(gridCheckerboard.grid)
// console.log(gridCheckerboard.checkWinner());
// for(var i = 0; i < 25; i++) {
//     let b = gridCheckerboard.autofillPlayer()
//     console.log(b)
// }

// let pos = indexOf2dArray(gridCheckerboard.grid, 1)
// console.log(pos)
// console.table(gridCheckerboard.grid)
// console.log(gridCheckerboard.grid)

