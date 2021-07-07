const Helper = require("../Helper");

class TicTacToe {

    constructor() {
        this.arr = [[],[],[]];
        this.players = ['X', 'O'];
        this.current_Player = 0;
    }


    move(x, y) {

        if(this.arr[x][y] != ' ') throw 'Field already set. Please choose another one.';

        this.arr[x][y] = this.players[this.current_Player];
        this.current_Player = (this.current_Player + 1) % this.players.length;

    }

    print() {
        return Helper.printMatrix(this.arr);
    }

}