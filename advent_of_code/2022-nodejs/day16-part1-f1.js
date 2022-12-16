const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day16-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day16-part1.js INPUT'    to process Todays input from 'day16-input.txt'.
//
//  Enter:
//    'node .\day16-part1.js TEST'     to process Todays Testinput from 'day16-input-test.txt'.
//    'node .\day16-part1.js'          to process Todays Testinput from 'day16-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day16-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day16-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const input = fileContent.split('\r\n')

// Get Needed Classes
const PriorityQueue = Datastructures.MaxHeap

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

class Valve {

  static START_VALVE
  static VALVES = {};

  static getByName(name) {
    if (name in Valve.VALVES)
      return Valve.VALVES[name]

    const valve = new Valve()
    valve.name = name
    Valve.VALVES[name] = valve

    if (!Valve.START_VALVE)
      Valve.START_VALVE = valve

    return valve
  }

  static Generate(name, flowRate, connections) {
    const valve = Valve.getByName(name)
    valve.flowRate = parseInt(flowRate)
    valve.connections = connections.map(next => Valve.getByName(next))
  }

  [Symbol.for('nodejs.util.inspect.custom')](depth, inspectOptions, inspect) {
    return this.toString()
  }

  toString() {
    return `${this.name} ==> (${this.connections.map(v => v.name).join(', ')})`
  }

}

input.forEach(valveDefiniton =>
  Valve.Generate(
    valveDefiniton.match(/[A-Z]{2}/)[0],
    valveDefiniton.match(/\d+/)[0],
    valveDefiniton.match(/[A-Z]{2}/g).slice(1)
  )
)


///////////////////////////////////////////////////////////////

class Node {

  static MOVE = 'MOVE'
  static OPEN = 'OPEN'

  constructor(valve, action = Node.MOVE, previous = null) {
    this.valve = valve
    this.action = action
    this.minute = (previous?.minute ?? -1) + 1
    this.releasedPressure = (previous?.releasedPressure ?? 0) + (previous?.releasePerMinute ?? 0)

    // Add flowrate after opening
    this.releasePerMinute = (previous?.releasePerMinute ?? 0) + (action == Node.OPEN ? valve.flowRate : 0)

    this.path = (previous?.path ?? '') + ' => ' + this.minute + '-' + valve.name
    this.openedValves = (previous?.openedValves ?? '') + (action == Node.OPEN ? `${valve.name},` : '')
    this.movesInRow = action == Node.MOVE ? (previous?.movesInRow ?? 0) + 1 : 0

    this.previousValve = previous?.valve
  }
}


const maxTime = 10
const root = new Node(Valve.START_VALVE)
const queue = new PriorityQueue(node => node.releasedPressure + node.releasePerMinute)
queue.add(root)

let maximum = null


// TODO - Implement pathfinding and find longest path to the minute ??
while (queue.size > 0) {

  const current = queue.poll()

  // Filter out anynodes that endlessly move around between valves
  if (current.movesInRow >= 5) continue

  if (current.minute >= maxTime) {
    maximum = maximum == null || current.releasedPressure > maximum.releasedPressure ? current : maximum
    continue
  }

  // Open Current Valve
  if (current.action == Node.MOVE && current.valve.flowRate != 0 && !current.openedValves.includes(current.valve.name)) {
    const openValve = new Node(current.valve, Node.OPEN, current)
    queue.add(openValve)
  }

  // Visit next Valves
  for (const valve of current.valve.connections) {
    const nextNode = new Node(valve, Node.MOVE, current)
    queue.add(nextNode)
  }

}

console.log(queue)
console.log(maximum)