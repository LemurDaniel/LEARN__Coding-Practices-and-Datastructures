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
const paketMarkerArr = []
const messageMarkerArr = []
const paketMarkerLength = 4
const messageMarkerLength = 14

let foundPaketMarker = false
let foundMessageMarker = false

// Overcomplicating everything with some unecessary readstream
fileContent
  .on('readable', function () {

    let char
    // Can't use anonymous function or else, [this.] won't be set to current
    while ((char = this.read(1)) != null) {

      index++

      if (paketMarkerArr.length >= paketMarkerLength) {
        paketMarkerArr.shift()
      }
      if (messageMarkerArr.length >= messageMarkerLength) {
        messageMarkerArr.shift()
      }

      paketMarkerArr.push(char)
      messageMarkerArr.push(char)


      if (!foundMessageMarker && messageMarkerArr.length >= messageMarkerLength) {
        foundMessageMarker = messageMarkerArr.filter(n => messageMarkerArr.filter(v => v == n).length > 1).length == 0
        if (foundMessageMarker) {
          console.log(`First unique message-marker Found at ${index} ${messageMarkerArr.join('')}`)
        }
      }

      if (!foundPaketMarker && paketMarkerArr.length >= paketMarkerLength) {
        foundPaketMarker = paketMarkerArr.filter(n => paketMarkerArr.filter(v => v == n).length > 1).length == 0
        if (foundPaketMarker) {
          console.log(`First unique packet-marker Found at ${index} ${paketMarkerArr.join('')}`)
        }
      }

      if (foundMessageMarker && foundPaketMarker) {
        console.log()
        fileContent.destroy()
        return
      }

    }
  })
