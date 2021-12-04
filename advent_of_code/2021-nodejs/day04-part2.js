const fs = require('fs');
const readline = require('readline');


// const input = fs.readFileSync('input/day04-input-test.txt', 'utf-8').split('\r\n');
const input = fs.readFileSync('input/day04-input.txt', 'utf-8').split('\r\n');

const numberOrder = input[0].split(',');
const boards = [];


class Board {

  constructor() {
    this.board = [];
    this.marked = [];
  }

  addLine(str) {
    let row = str.replace(/\s{2,}/g, ' ').trim().split(' ');
    this.board.push(row);
    this.marked.push(row.map(v => 0));
  }

  markNumber(num) {

    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] != num) continue;

        this.marked[row][col] = 1;
        return this.checkVertical(col) || this.checkHorizontal(row);
      }
    }
  }

  checkVertical(col) {
    for (let row = 0; row < this.marked.length; row++) {
      if (this.marked[row][col] != 1) return false;
    }
    return true;
  }

  checkHorizontal(row) {
    for (let col = 0; col < this.marked.length; col++) {
      if (this.marked[row][col] != 1) return false;
    }
    return true;
  }

  getUnmarkedNumbers() {
    let unmarked = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.marked[row][col] != 1)
          unmarked.push(parseInt(this.board[row][col]))
      }
    }

    return unmarked;
  }
}


for (let i = 1, currentBoard; i < input.length; i++) {

  if (input[i] === '') {
    currentBoard = new Board();
    boards.push(currentBoard);
  }
  else
    currentBoard.addLine(input[i])

}


var drawnNumber;

loop1:
for (let i = 0; i < numberOrder.length; i++) {

  drawnNumber = numberOrder[i];

  let ptrStart = 0;
  for (let i = 0; i < boards.length; i++) {
    let bingo = boards[i].markNumber(drawnNumber);
    if (!bingo)
      boards[ptrStart++] = boards[i];
    else if (boards.length === 1)
      break loop1;
  }
  boards.length = ptrStart;
}


console.log(drawnNumber)
solution = boards[0].getUnmarkedNumbers().reduce((acc, v) => acc + v) * drawnNumber;
console.log(solution)