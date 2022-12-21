const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day15-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day15-part1.js INPUT'    to process Todays input from 'day15-input.txt'.
//
//  Enter:
//    'node .\day15-part1.js TEST'     to process Todays Testinput from 'day15-input-test.txt'.
//    'node .\day15-part1.js'          to process Todays Testinput from 'day15-input-test.txt'.

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

const test = input.map(
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


// Specify Target-Y-Axis, then generate all Intersection-Ranges for all Sensors on it.
const targetY = argument.includes('TEST') ? 10 : 2_000_000
let intersectionRanges = []

for (let sensor of Object.values(SENSORS)) {

  const beacon = BEACONS[sensor]
  const signalStrength = sensor.manhattenDist(beacon)

  // First disregard all sensors with Signal Strength Out of Reach for specified Y-Axis
  if (Math.abs(targetY - sensor.y) > signalStrength)
    continue

  // Calculate the Range of Intersection on the Y-Axis that is searched for.

  //          Left <== SignalReach ==> Right
  //      . . . # # # # # # S # # # # # # . . .
  //      . . . . # # # # # # # # # # # . . . .
  //      . . . . . # # # # # # # # # . . . . .
  //      . . . . . . # # # # # # # . . . . . . <== TargetY
  //                  ^           ^
  //          Intersection Range on Specified Y

  // On the Y-Axis of the Sensor the covered X-Positions Reach from 
  // 'sensorPosX - SignalStrengt' on the Left and 'sensorPosX + signalStrength' on the Right
  const signalReachXLeft = Vector2D.sub(sensor, signalStrength)
  const signalReachXRight = Vector2D.add(sensor, signalStrength)

  // The signalStrengthRange on the Y-Axis decreases by one, the Further the distance between the 'sensorY' and 'targetY' by 1
  const diffY = Math.abs(targetY - sensor.y)
  // Subtract the Difference on the Y-Axis from the X-Axis of the signalReachRanges on both sides
  signalReachXLeft.add(diffY)
  signalReachXRight.sub(diffY)
  signalReachXLeft.y = targetY
  signalReachXRight.y = targetY
  // The Manhattendistance of both Vectors to the Sensor is now equal to the signalStrength and both of them mark 
  // the Start and End of the Range of SignalIntersection on the targetY.

  // Add to array for further processing, since signal ranges could potentially overlap
  // (-4, 10) => (14, 10) with (-2, 10) => (8, 10)
  intersectionRanges.push([signalReachXLeft, signalReachXRight])
}

///////////////////////////////////////////////////////////////


function mergeRanges(intersectionRanges) {

  const intialRangesCount = intersectionRanges.length
  intersectionRanges.sort((a, b) => b[0].x - a[0].x)
  const finalIntersections = [intersectionRanges.pop()]

  while (intersectionRanges.length > 0) {

    const [rangeStartCurr, rangeEndCurr] = finalIntersections[finalIntersections.length - 1]
    const [rangeStartNext, rangeEndNext] = intersectionRanges.pop()

    // Disregard if the Range is already containted in the existing range
    if (rangeStartNext.x > rangeStartCurr.x && rangeEndNext.x < rangeEndCurr.x)
      continue

    const expandStart = rangeStartNext.x < rangeStartCurr.x && rangeEndNext.x >= rangeStartCurr.x
    const expandEnd = rangeEndNext.x > rangeEndCurr.x && rangeStartNext.x <= rangeEndCurr.x
    if (expandStart)
      rangeStartCurr.x = rangeStartNext.x

    if (expandEnd)
      rangeEndCurr.x = rangeEndNext.x

    if (!expandStart && !expandEnd)
      finalIntersections.push([rangeStartNext, rangeEndNext])

  }

  // TODO Improve, since now on the merge ranges, the method has to be called again, to make sure those can't be merged further
  if (intialRangesCount != finalIntersections.length)
    return mergeRanges(finalIntersections)
  else
    return finalIntersections
}

///////////////////////////////////////////////////////////////


// Merge any Overlapping Ranges
intersectionRanges = mergeRanges(intersectionRanges)

// Get final count of covered positions by processed ranges.
const coveredPositions = intersectionRanges.reduce((covered, range) => covered + Math.abs(range[0].x - range[1].x), 0)

console.clear()
console.group()
console.log('\nCalculated and merged intersection ranges: ')
console.log(Utils.Print.fromArray(intersectionRanges, 0, value => `${value[0].toString()} ==> ${value[1].toString()}`))
console.log(`\nOn the Y-Axis at ${targetY.toLocaleString()} there are a total of ${coveredPositions.toLocaleString()} that can't have a beacon.\n`)
console.groupEnd()