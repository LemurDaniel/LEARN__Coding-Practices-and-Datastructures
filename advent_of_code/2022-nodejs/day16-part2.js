const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day16-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day16-part2.js INPUT'    to process Todays input from 'day16-input.txt'.
//
//  Enter:
//    'node .\day16-part2.js TEST'     to process Todays Testinput from 'day16-input-test.txt'.
//    'node .\day16-part2.js'          to process Todays Testinput from 'day16-input-test.txt'.

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
const MaxTime = 26 // minutes

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

  get minute() {
    return this.el[1] + this.me[1]
  }

  constructor(me, el, openedValves, pressureSum) {
    this.me = me
    this.el = el

    this.openedValves = openedValves ?? {}
    this.pressureSum = pressureSum ?? 0
  }

}

const valve = Valve.getByName('AA')
const root = new Node([valve, 0], [valve, 0])
const queue = new Queue()
queue.enqueue(root, 0)
let maximum = root
let test = 0

const bla = {}

console.clear()
console.log('\nThis will take a bit...')
console.log('\nNot a good one, but it is a solution')

console.group()

while (!queue.isEmpty) {

  const nodeCurr = queue.dequeue()

  if (test++ % 250_000 == 0)
    console.log(`Nodes enqueued: ${queue.count.toLocaleString()} | Current Maximum: ${maximum.pressureSum} | Current Node: ${nodeCurr.pressureSum}`)

  if (nodeCurr.minute > Math.ceil(MaxTime * 0.85) && nodeCurr.pressureSum in bla) {
    if (nodeCurr.minute < bla[nodeCurr.pressureSum].minute)
      bla[nodeCurr.pressureSum] = nodeCurr
    else
      continue
  }
  else
    bla[nodeCurr.pressureSum] = nodeCurr

  // Blatantly disregard any pressure sums below a certain treshhold of the current found maximum, to not totally run ot of memory
  if (maximum.pressureSum > 0 && nodeCurr.pressureSum <= 0.1 * maximum.pressureSum)
    continue

  const el = nodeCurr.el
  const me = nodeCurr.me

  const valves = Array.from(Valve).filter(v => !(v in nodeCurr.openedValves) && v.flowRate > 0)
  const valvesM = valves.map(v => [v, ...v.realeasedPressureWhen(...me)])
  const valvesE = valves.map(v => [v, ...v.realeasedPressureWhen(...el)])

  for (const [valveM, releasedM, minuteM] of valvesM) {
    for (const [valveE, releasedE, minuteE] of valvesE) {
      if (valveM == valveE) continue
      if (minuteM > MaxTime && minuteE > MaxTime) continue

      let meNew = me
      let elNew = el
      let pressureSum = nodeCurr.pressureSum
      let minute = Math.min(minuteM, minuteE)
      const openedValves = { ...nodeCurr.openedValves }

      if (minuteM <= MaxTime) {
        pressureSum += releasedM
        openedValves[valveM] = me
        meNew = [valveM, minuteM]
      }
      if (minuteE <= MaxTime) {
        pressureSum += releasedE
        openedValves[valveE] = el
        elNew = [valveE, minuteE]
      }

      // Create new Node with calculated values and recurse further on it
      const node = new Node(meNew, elNew, openedValves, pressureSum)
      queue.enqueue(node)

      if (node.pressureSum > maximum.pressureSum) {
        maximum = node
      }
    }
  }
}


console.log(`\nThe Most pressure which can be released in ${MaxTime} minutes is ${maximum.pressureSum}\n`)
console.groupEnd()
