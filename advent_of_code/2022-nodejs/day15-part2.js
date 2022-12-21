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
const MIN_COORD = 0
const MAX_COORD = argument.includes('TEST') ? 20 : 4_000_000
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

///////////////////////////////////////////////////////////////

// Process Input
input.map(
  line => line.split(':').map(
    segment => segment.match(/-{0,1}\d+/g)
  )
).forEach(line => {
  const sensor = new Sensor(...line[0])
  const beacon = new Beacon(...line[1])
  SENSORS[sensor] = sensor
  BEACONS[sensor] = beacon
})


///////////////////////////////////////////////////////////////

const sensors = Object.values(SENSORS)
function isCovered(target) {

  for (let i = 0; i < sensors.length; i++) {

    const beacon = BEACONS[sensors[i]]
    const signalStrength = sensors[i].manhattenDist(beacon)

    const inReachY = Math.abs(target[1] - sensors[i].y) <= signalStrength
    const inReachX = Math.abs(target[0] - sensors[i].x) <= signalStrength


    // Check if it is included in range on X-Axis
    if (inReachY) {
      const diffY = Math.abs(target[1] - sensors[i].y)
      const signalReachLeft = sensors[i].x - signalStrength + diffY
      const signalReachRight = sensors[i].x + signalStrength - diffY

      if (target[0] >= signalReachLeft && target[0] <= signalReachRight)
        return true
    }

    // Check if it is included in range on Y-Axis
    if (inReachX) {
      const diffX = Math.abs(target[0] - sensors[i].x)
      const signalReachDown = sensors[i].y - signalStrength + diffX
      const signalReachUp = sensors[i].y + signalStrength - diffX

      //console.log('Y', target, sensors[i], signalStrength)
      //console.log(signalReachDown, signalReachUp, target[1] >= signalReachDown && target[1] <= signalReachUp)
      if (target[1] >= signalReachDown && target[1] <= signalReachUp)
        return true
    }

  }

  return false
}

///////////////////////////////////////////////////////////////

/*
2 =>  8
3 => 12
4 => 16
5 => 20


              (0,4)
                #
              # # #
            # # # # #
          # # # # # # # 
 (-4,0) # # # # S # # # # (4,0)
          # # # # # # # (3,-1)
            # # # # # (2,-2)
      (-1,-3) # # # (1,-3)
                # 
             (0,-4)
*/

function sensorSurroundings(sensor) {

  const signalStrength = sensor.manhattenDist(BEACONS[sensor])
  const sg = signalStrength + 1
  const directions = [
    [1, -1, 0, sg, 0], //Up to Right || [walkX, walkY, posX*sgStrength, posY*sgStrength]
    [-1, -1, sg, 0], //Right to Down
    [-1, 1, 0, -sg], // Down to Left
    [1, 1, -sg, 0] // Left to up
  ]

  const iterators = [0, 0, 0, 0]
  for (let index = 0; index < directions.length; index++) {

    const direction = directions[index]
    const position = [sensor.x + direction[2], sensor.y + direction[3]]

    position[0] = Math.min(MAX_COORD, Math.max(MIN_COORD, position[0]))
    position[1] = Math.min(MAX_COORD, Math.max(MIN_COORD, position[1]))

    function* sub() {
      INNER:
      while (true) {
        yield ([...position])
        position[0] += direction[0]
        position[1] += direction[1]

        if (position[0] > MAX_COORD || position[0] < MIN_COORD) break INNER
        if (position[1] > MAX_COORD || position[1] < MIN_COORD) break INNER

        if (index == 0 && (position[0] >= (sensor.x + signalStrength + 1))) break INNER
        if (index == 1 && (position[1] <= (sensor.y - signalStrength - 1))) break INNER
        if (index == 2 && (position[0] <= (sensor.x - signalStrength - 1))) break INNER
        if (index == 3 && (position[1] >= (sensor.y + signalStrength + 1))) break INNER
      }
    }
    iterators[index] = sub()
  }

  return iterators

}

///////////////////////////////////////////////////////////////

function bruteForceFindHiddenBeacon(callback) {

  let positionsProcessed = [0, 0, 0, 0]
  let sensorIndex = [0, 0, 0, 0]
  let workers = [0, 0, 0, 0]
  const sensors = Object.values(SENSORS)

  let isFinished = false
  let milli = performance.now()

  for (let index = 0; index < 4; index++) {
    workers[index] = new Thread.Worker(__filename, {
      argv: [argument]
    })

    workers[index]
      .on('message', result => {

        positionsProcessed[result.myIndex] = result.processed
        const totalPositionsProcessed = positionsProcessed.reduce((acc, a) => acc + a)
        if (totalPositionsProcessed % 200_000 == 0 && totalPositionsProcessed > 0) {
          const now = performance.now()

          const sensorsProcessed = [...(new Set(sensorIndex))].map(i => sensors[i])
          console.log(`Positions Processed: ${totalPositionsProcessed.toLocaleString()}  in ${((now - milli) / 1000).toLocaleString()} seconds`)
          console.group()
          console.log(sensorsProcessed.reduce((str, s) => str + s.toString(), 'on Sensors: '))
          console.groupEnd()
          milli = now
        }

        if (result.done && result.hasCoord && !isFinished) {
          isFinished = true
          workers.forEach(w => w.terminate())
          callback(result.coord)
        }
        // If another worker hasn't finished yet.
        else if (result.done && !isFinished) {
          sensorIndex[result.myIndex]++
          const myIndex = result.myIndex
          const mySensor = sensors[sensorIndex[myIndex]]
          if (null != mySensor)
            workers[result.myIndex].postMessage([mySensor.toString(), myIndex])
          else {
            workers[myIndex].terminate()
          }
        }

      })

    workers[index].postMessage([sensors[sensorIndex[index]].toString(), index])

  }
}


const Thread = require('node:worker_threads');

if (Thread.isMainThread) {

  console.clear()
  console.log()
  const now = performance.now()
  const coord = bruteForceFindHiddenBeacon(
    coord => {
      console.group()
      console.log(`\nTotal Time Taken: ${((performance.now() - now) / 1000).toLocaleString()} seconds`)
      console.log(`\nThe hidden Distress-beacon is at Location (${coord[0].toLocaleString()}, ${coord[1].toLocaleString()}) with a tuning frequency of ${(coord[0] * 4_000_000 + coord[1]).toLocaleString()}\n`)
      console.groupEnd()
      //process.exit()
    }
  )

} else {

  Thread.parentPort.on('message', ([sensor, index]) => {

    const iterator = sensorSurroundings(SENSORS[sensor])[index]
    let poistionsCount = 0
    for (const pos of iterator) {
      poistionsCount++
      if (poistionsCount % 50_000 == 0)
        Thread.parentPort.postMessage({ processed: poistionsCount, done: false, myIndex: index })

      if (!isCovered(pos)) {
        Thread.parentPort.postMessage({ processed: poistionsCount, done: true, hasCoord: true, coord: pos })
        return
      }
    }
    Thread.parentPort.postMessage({ processed: poistionsCount, done: true, hasCoord: false, myIndex: index })
  })
}