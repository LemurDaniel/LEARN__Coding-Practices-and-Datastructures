const fs = require('fs');
const readline = require('readline');


const instructions = readline.createInterface({
  // input: fs.createReadStream('./input/day02-input-test.txt')
  input: fs.createReadStream('./input/day02-input.txt')
});


// Submarine class Definition
class Submarine {

  constructor() {
    this.horizontal = 0
    this.depth = 0
    this.aim = 0
  }

  move(instruction, value) {

    instruction = instruction.toLowerCase();
    value = parseInt(value)

    switch (instruction) {
      case 'forward':
        this.horizontal += value;
        this.depth += this.aim * value;
        break;
      case 'down':
        this.aim += value;
        break;
      case 'up':
        this.aim -= value;
        break;

      default:
        throw new Error(instruction + ' is not a valid instruction');
    }
  }

  toString() {
    return '' +
      '\n  Horizontal: ' + this.horizontal +
      '\n  Depth: ' + this.depth +
      '\n  Product: ' + this.depth * this.horizontal +
      '\n';
  }
}




const Elveferry = new Submarine;

instructions.on('line', instruction =>
  Submarine.prototype.move.apply(Elveferry, instruction.split(' '))
)

instructions.on('close', () =>
  console.log(Elveferry.toString())
);
