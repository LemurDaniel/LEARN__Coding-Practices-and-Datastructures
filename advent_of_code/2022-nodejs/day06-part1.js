const fs = require('fs');

var fileContent = fs.createReadStream('input/day06-input.txt', 'utf-8')
// fileContent = fs.createReadStream('input/day06-input-test.txt', 'utf-8')

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
      if(charsUnique) {
        console.log(`First unique packet-marker Found at ${index} ${array.join('')}`)
        fileContent.destroy()
        return
      }

    }
  })
