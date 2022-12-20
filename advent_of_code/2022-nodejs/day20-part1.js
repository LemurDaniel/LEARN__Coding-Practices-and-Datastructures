const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day20-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day20-part1.js INPUT'    to process Todays input from 'day20-input.txt'.
//
//  Enter:
//    'node .\day20-part1.js TEST'     to process Todays Testinput from 'day20-input-test.txt'.
//    'node .\day20-part1.js'          to process Todays Testinput from 'day20-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day20-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day20-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n').map(v => parseInt(v))

// Get Needed Classes
const CircularLinkedList = Datastructures.DoubleCircularLinkedList

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

const list = new CircularLinkedList()
const references = Input.map(num => list.insert(num))

// Shift nodes while maintaining original order.
for (const node of references) {
  node.shiftBy(node.value % (Input.length - 1)) // Needs to be length of list -1
}


// Search for nth num of zero
const offsets = [1000, 2000, 3000].map(nth => nth % Input.length)
  .reduce((obj, offset, index) => ({ ...obj, [offset]: offset }), new Object())

const offsetMax = Math.max(...Object.values(offsets))
for (let i = 0, node = list.search(0); i <= offsetMax; i++, node = node.next) {
  if (i in offsets) offsets[i] = node
}


const sum = Object.values(offsets).reduce((acc, nth) => acc + nth.value, 0)

console.log(`\n The Sum of the three Numbers forming the Groove Coordinate is: '${sum.toLocaleString()}'\n`)
