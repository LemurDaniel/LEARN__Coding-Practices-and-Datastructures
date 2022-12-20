const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day15-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day15-part2.js INPUT'    to process Todays input from 'day15-input.txt'.
//
//  Enter:
//    'node .\day15-part2.js TEST'     to process Todays Testinput from 'day15-input-test.txt'.
//    'node .\day15-part2.js'          to process Todays Testinput from 'day15-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day15-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day15-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const input = fileContent.split('\r\n')

// Get Needed Classes
const Vector2D = Datastructures.Vector2D

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

class Beacon extends Vector2D { }
class Sensor extends Vector2D { }
Vector2D.prototype.toString = function toString() {
  return `${this.constructor.name}(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`
}

const SENSORS = {}
const BEACONS = {}
const BOUNDS = {
  max: Vector2D.NULL,
  min: Vector2D.NULL

}


///////////////////////////////////////////////////////////////

// Process Input
input.map(
  line => line.split(':').map(
    segment => segment.match(/-{0,1}\d+/g)
  )
).forEach(line => {
  const sensor = new Sensor(...line[0])
  const beacon = new Beacon(...line[1])
  BOUNDS.max.x = Math.max(sensor.y, beacon.x, BOUNDS.max.x)
  BOUNDS.max.y = Math.max(sensor.y, beacon.y, BOUNDS.max.y)
  BOUNDS.min.x = Math.min(sensor.y, beacon.x, BOUNDS.min.x)
  BOUNDS.min.y = Math.min(sensor.y, beacon.y, BOUNDS.min.y)
  SENSORS[sensor] = sensor
  BEACONS[sensor] = beacon
})


///////////////////////////////////////////////////////////////

const cached = {}
function GetIntersectionRangesFor(target, Axis) {

  Axis = Axis.toUpperCase()
  if (Axis != 'Y' && Axis != 'X') throw 'Error'

  if (cached[[target, Axis]])
    return cached[[target, Axis]]

  let intersectionRanges = []

  for (const sensor of Object.values(SENSORS)) {

    const beacon = BEACONS[sensor]
    const signalStrength = sensor.manhattenDist(beacon)

    // First disregard all sensors with Signal Strength Out of Reach for specified Y-Axis
    if (Axis == 'Y' && Math.abs(target - sensor.y) > signalStrength)
      continue

    if (Axis == 'X' && Math.abs(target - sensor.x) > signalStrength)
      continue


    if (Axis == 'Y') {
      const diffY = Math.abs(target - sensor.y)
      const signalReachLeft = [sensor.x - signalStrength + diffY, target]
      const signalReachRight = [sensor.x + signalStrength - diffY, target]

      intersectionRanges.push([signalReachLeft, signalReachRight])
    } else if (Axis == 'X') {
      const diffX = Math.abs(target - sensor.x)
      const signalReachDown = [target, sensor.y - signalStrength + diffX]
      const signalReachUp = [target, sensor.y + signalStrength - diffX]

      intersectionRanges.push([signalReachDown, signalReachUp])
    }

  }

  return intersectionRanges
}

///////////////////////////////////////////////////////////////

const MAX = argument.includes('TEST') ? 20 : 4_000_000

function isCovered(array) {

  if (array[0] < 0 || array[0] > MAX || array[1] < 0 || array[1] > MAX)
    return true

  const Xintersections = GetIntersectionRangesFor(array[1], 'Y')
  const Yintersections = GetIntersectionRangesFor(array[0], 'X')

  for (const [start, end] of Xintersections) {

    if (array[0] >= start[0] && array[0] <= end[0])
      return true
  }

  for (const [start, end] of Yintersections) {

    if (array[1] >= start[1] && array[1] <= end[1])
      return true
  }

  return false
}



function bruteForceFindHiddenBeacon() {

  let positionsProcessed = 0
  let milli = performance.now()
  for (const sensor of Object.values(SENSORS)) {

    const beacon = BEACONS[sensor]
    const signalReach = sensor.manhattenDist(beacon)

    // Using array, instead of Vector2D class, to make things a bit faster.
    const signalReachUp = [sensor.x, sensor.y + signalReach + 1]
    const signalReachRight = [sensor.x + signalReach + 1, sensor.y]
    const signalReachDown = [sensor.x, sensor.y - signalReach - 1]
    const signalReachLeft = [sensor.x - signalReach - 1, sensor.y]

    for (let i = signalReach + 1; i >= 0; i--) {

      if (positionsProcessed % 200_000 == 0) {
        const now = performance.now()
        console.log('...Still looping some loops ', sensor, ` | Positions Processed: ${positionsProcessed.toLocaleString()}`, ` | in ${((now - milli) / 1000).toLocaleString()} seconds`)
        milli = now
      }

      if (!isCovered(signalReachUp)) return signalReachUp
      if (!isCovered(signalReachRight)) return signalReachRight
      if (!isCovered(signalReachDown)) return signalReachDown
      if (!isCovered(signalReachLeft)) return signalReachLeft
      positionsProcessed += 4 // since for positions per iterations

      signalReachUp[0]++
      signalReachUp[1]--

      signalReachRight[0]--
      signalReachRight[1]--

      signalReachDown[0]--
      signalReachDown[1]++

      signalReachLeft[0]++
      signalReachLeft[1]++


    }
  }

}


console.log('\n This kinda takes a while:')
console.group()
const now = performance.now()
const coord = bruteForceFindHiddenBeacon()
console.log(`\nTotal Time Taken: ${((performance.now() - now) / 1000).toLocaleString()} seconds`)
console.log(`\nThe hidden Distressbeacon is at Location (${coord[0].toLocaleString()}, ${coord[1].toLocaleString()}) with a tuning frequency of ${(coord[0] * 4_000_000 + coord[1]).toLocaleString()}\n`)
console.groupEnd()