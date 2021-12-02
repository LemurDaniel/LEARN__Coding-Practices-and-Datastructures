const fs = require('fs');
const readline = require('readline');


// Note to self: 
// https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/
// https://nodesource.com/blog/understanding-streams-in-nodejs/
// The difference between fs.ReadFile and readStreams is that with fs.readFile the whole file is read into memory and then processed.
// Streams  on the other hand read data chunkwise and process it while reading.
// Useful when handling really big amounts (not like here) of data or data that is read is received in chuncks.

const instructions = readline.createInterface({
  // input: fs.createReadStream('./input/day02-input-test.txt')
  input: fs.createReadStream('./input/day02-input.txt')
});


// Submarine class Definition
class Submarine {

  constructor() {
    this.horizontal = 0
    this.depth = 0
  }

  move(instruction, value) {

    instruction = instruction.toLowerCase();
    value = parseInt(value)

    switch (instruction) {
      case 'forward':
        this.horizontal += value;
        break;
      case 'down':
        this.depth += value;
        break;
      case 'up':
        this.depth -= value;
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
