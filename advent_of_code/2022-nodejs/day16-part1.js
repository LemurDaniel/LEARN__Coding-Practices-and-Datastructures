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
const Input = fileContent.split('\r\n')
const MaxTime = 30 // minutes

// Get Needed Classes
const Queue = Datastructures.NodeQueue

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

class Valve {

  static START_VALVE;
  static VALVES = {};

  static *[Symbol.iterator]() {
    for (const valve of Object.values(Valve.VALVES)) {
      yield valve
    }
  }

  static getByName(name) {
    if (name in Valve.VALVES)
      return Valve.VALVES[name]

    const valve = new Valve(name)
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


  name;
  flowRate;
  connections;
  shortesPaths;

  [Symbol.for('nodejs.util.inspect.custom')](depth, inspectOptions, inspect) {
    return `${this.name} ==> (${this.connections.map(v => v.name).join(', ')})`
  }

  toString() {
    return this.name
  }

  constructor(name) {
    this.name = name
    this.shortesPaths = {}
  }

  // Get the pressure Release until 30 Minute Mark, when opened at specified minute.
  // Takes into account the current Vavle position and how long it takes reaching this valve.
  realeasedPressureWhen(valve, opentime) {

    // Opentime minus the Time Penalty of Reaching the valve, which is 0 when it is the current valve, etc.
    // Opening a Valve takes a minute, which means adding another minute as penalty.
    const timePenalty = (opentime + this.shortesPaths[valve] + 1)
    const minutesLeft = MaxTime - timePenalty
    return [this.flowRate * minutesLeft, timePenalty]
  }

  // Process the shortes distance from each valve to the next valve.
  // This can then be used in my following alorithm, to choose the next best node.
  shortestPaths() {

    const shortesPaths = this.shortesPaths
    shortesPaths[this] = 0 // Add this as 0, since no movement necessary.
    const queue = new Queue()
    queue.enqueue(this)

    // BFS search for shortest paths from this node to all other Valves in minutes.
    while (!queue.isEmpty) {

      const current = queue.dequeue()

      // Get shortest path by looking at the shortest path for this node and adding 1 minute for moving there.
      // It has to be in there, since when we arrive by this valve, we have through the connection of a previously processed valve.
      for (const valve of current.connections) {

        const calculatePath = shortesPaths[current] + 1

        // If there is already a shorter path from this to the valve, then continue
        if (valve in shortesPaths && shortesPaths[valve] <= calculatePath)
          continue

        // If a shortest path is found, update it in the map and enque the valve, for processing all valves reachable from it
        shortesPaths[valve] = calculatePath
        queue.enqueue(valve)
      }
    }
  }
}

Input.forEach(valveDefiniton =>
  Valve.Generate(
    valveDefiniton.match(/[A-Z]{2}/)[0],
    valveDefiniton.match(/\d+/)[0],
    valveDefiniton.match(/[A-Z]{2}/g).slice(1)
  )
)

// Process shortest paths to other valves for each valve
Array.from(Valve).forEach(valve => valve.shortestPaths())


///////////////////////////////////////////////////////////////

class Node {

  static GetOptimalFor(valve) {
    const root = new Node(valve)
    return root.maximise()
  }

  constructor(valve, minute, openedValves, sumOfReleasedPressure) {
    this.valve = valve
    this.minute = minute ?? 0
    this.openedValves = openedValves ?? {}
    this.sumOfReleasedPressure = sumOfReleasedPressure ?? 0
  }

  // Do some recursion
  maximise() {

    let maximised = null
    const previous = this
    for (const currentValve of Valve) {

      // Only consider valves, which are not already opened and have flowrates above 0
      if (currentValve.flowRate == 0)
        continue
      if (currentValve in previous.openedValves)
        continue

      const [released, minute] = currentValve.realeasedPressureWhen(previous.valve, previous.minute)
      const sumOfReleasedPressure = previous.sumOfReleasedPressure + released
      // Cancel recursion if max time is reached
      // Might end already sooner when no more valves are left
      if (minute > MaxTime) continue
      const openedValves = {
        ...previous.openedValves,
        [currentValve]: true
      }


      // Create new Node with calculated values and recurse further on it
      const node = new Node(
        currentValve,
        minute,
        openedValves,
        sumOfReleasedPressure
      ).maximise()

      if (null == maximised || node.sumOfReleasedPressure > maximised.sumOfReleasedPressure) {
        maximised = node
      }
    }

    return maximised ?? this
  }

}


// Node.GetOptimalFor(Valve.START_VALVE)
const optimal = Node.GetOptimalFor(Valve.getByName('AA'))

console.clear()
console.log(`\n The Most pressure which can be released in ${MaxTime} minutes is ${optimal.sumOfReleasedPressure} \n`)