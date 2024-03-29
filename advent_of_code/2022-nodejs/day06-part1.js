const fs = require('fs');

const argument = process.argv[2] ?? 'TEST'
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.createReadStream('input/day06-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.createReadStream('input/day06-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

let index = 0
const array = []
const markerLength = 4

// Overcomplicating everything with some unecessary readstream, but it makes sense with the premise of the puzzle.
// Because said device receiving signals, won't reice all at once and then end, but continously receive from an theoratically unending input datastream.
fileContent
  .on('readable', function () {

    let char
    // Can't use anonymous function or else, [this.] won't be set to current stream
    // NOTE: For Reference - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    //  
    // Arrow functions
    // In arrow functions, this retains the value of the enclosing lexical context's this. 
    // In other words, when evaluating an arrow function's body, the language does not create a new this binding.
    //
    // or: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

    while ((char = this.read(1)) != null) {

      index++

      if (array.length < markerLength) {
        array.push(char)
        continue;
      }

      array.shift()
      array.push(char)

      const charsUnique = array.filter(n => array.filter(v => v == n).length > 1).length == 0
      if (charsUnique) {
        console.log(`First unique packet-marker Found at ${index} ${array.join('')}`)
        console.log()
        fileContent.destroy()
        return
      }

    }
  })
