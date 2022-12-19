const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day19-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day19-part2.js INPUT'    to process Todays input from 'day19-input.txt'.
//
//  Enter:
//    'node .\day19-part2.js TEST'     to process Todays Testinput from 'day19-input-test.txt'.
//    'node .\day19-part2.js'          to process Todays Testinput from 'day19-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day19-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day19-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = argument.includes('TEST') ? fileContent.split('\r\n\r\n') : fileContent.split('\r\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

class Resources extends Datastructures.VectorBase {

  get ore() {
    return this.dimension[0]
  }
  get clay() {
    return this.dimension[1]
  }
  get obsidian() {
    return this.dimension[2]
  }
  get geode() {
    return this.dimension[3]
  }

  set ore(value) {
    this.dimension[0] = value
  }
  set clay(value) {
    this.dimension[1] = value
  }
  set obsidian(value) {
    this.dimension[2] = value
  }
  set geode(value) {
    this.dimension[3] = value
  }

}

class Robots extends Resources { }

///////////////////////////////////////////////////////////////

class Blueprint {

  static ALL = Input.map(definition => new Blueprint(definition))
  static Robot = {
    ORE: 0,
    CLAY: 1,
    OBSIDIAN: 2,
    GEODE: 3,
  }

  constructor(blueprintDefinition) {

    this.name = 0
    this.id = 0
    let lines

    if (argument.includes('TEST')) {
      blueprintDefinition = blueprintDefinition.split('\r\n').map(v => v.trim())
      this.name = blueprintDefinition[0]
      this.id = parseInt(this.name.match(/\d+/)[0])

      lines = blueprintDefinition.slice(1)
        .map(line => line.match(/\d+/g).map(cost => parseInt(cost)))
    }
    else {
      blueprintDefinition = blueprintDefinition.split(':')
      this.name = blueprintDefinition[0].trim()
      this.id = parseInt(this.name.match(/\d+/)[0])

      lines = blueprintDefinition[1].split('.').slice(0, 4)
        .map(line => line.match(/\d+/g).map(cost => parseInt(cost)))
    }


    this.robotOre = new Resources(lines[0][0], 0, 0, 0)
    this.robotClay = new Resources(lines[1][0], 0, 0, 0)
    this.robotObsidian = new Resources(lines[2][0], lines[2][1], 0, 0)
    this.robotGeode = new Resources(lines[3][0], 0, lines[3][1], 0)

    // Maximum spendable resources of a blueprint
    this.maxOre = Math.max(this.robotOre.ore, this.robotClay.ore, this.robotObsidian.ore, this.robotGeode.ore)
    this.maxClay = Math.max(this.robotObsidian.clay, this.robotGeode.clay)
    this.maxObsidian = this.robotGeode.obsidian
  }

}

///////////////////////////////////////////////////////////////

class Tree {

  static TEST = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171, 190, 210, 231, 253, 276, 300, 325, 351, 378, 406, 435, 465, 496, 528, 561, 595, 630, 666]

  constructor(maxtime, blueprint) {
    this.root = new Tree.Node(0, this)

    this.maxResources = new Resources(0, 0, 0, 0)
    this.maxMinute = maxtime
    this.blueprint = blueprint
  }

  maximum() {
    this.root.maximum()
    return this.maxResources
  }

  static Node = class Node {

    constructor(minute = 0, tree, robots, resources, lastBuyables) {
      this.tree = tree
      this.minute = minute
      this.robots = robots ?? new Robots(1, 0, 0, 0)
      this.resources = resources ?? new Resources(0, 0, 0, 0)
      this.lastBuyables = lastBuyables ?? 0b0000
    }

    maximum() {

      const remainingTime = this.tree.maxMinute - this.minute
      if (remainingTime < 0)
        return

      if (this.resources.geode + (this.robots.geode * remainingTime) + Tree.TEST[remainingTime] <= (this.tree.maxResources.geode ?? 0))
        return

      if (this.resources.geode > (this.tree.maxResources.geode ?? 0)) {
        this.tree.maxResources = this.resources
      }

      // each robot adds one of its ore, per turn
      const blueprint = this.tree.blueprint
      const minute = this.minute + 1
      const resources = Resources.add(this.resources, this.robots)

      // console.log(minute, 'minute', resources, this.resources, this.robots, this.lastBuyables)

      //if (minute == 6) console.log(minute, 'minute', resources, this.resources, this.robots, this.lastBuyables)

      // Start building an additional Robots with some limitations
      const maxOreProductionReached = this.robots.ore >= blueprint.maxOre
      const maxClayProductionReached = this.robots.clay >= blueprint.maxClay
      const maxObsidianProductionReached = this.robots.obsidian >= blueprint.maxObsidian

      // Check if there are enough resources considering the robotcost
      const canBuyOre = !(this.lastBuyables & 0b10000) && !maxOreProductionReached && this.resources.ore >= blueprint.robotOre.ore
      const canBuyClay = !(this.lastBuyables & 0b0100) && !maxClayProductionReached && this.resources.ore >= blueprint.robotClay.ore
      const canBuyObsidian = !(this.lastBuyables & 0b0010) && !maxObsidianProductionReached && this.resources.ore >= blueprint.robotObsidian.ore && this.resources.clay >= blueprint.robotObsidian.clay
      const canBuyGeode = !(this.lastBuyables & 0b0001) && this.resources.ore >= blueprint.robotGeode.ore && this.resources.obsidian >= blueprint.robotGeode.obsidian


      // Purchasing no robot
      if (!canBuyObsidian && !canBuyGeode) {
        const buyables = parseInt([canBuyOre, canBuyClay, canBuyObsidian, canBuyGeode].map(Number).join(''), 2)
        const node = new Node(minute, this.tree, this.robots, resources, buyables)
        node.maximum()
      }

      // Attempt building robots only when geode robot can't be build, seems to work with this input
      if (canBuyOre && !canBuyGeode) {
        const resNext = Resources.sub(resources, blueprint.robotOre)
        const robots = Robots.add(this.robots, 1, 0, 0, 0)
        const node = new Node(minute, this.tree, robots, resNext)
        node.maximum()
      }
      if (canBuyClay && !canBuyGeode) {
        const resNext = Resources.sub(resources, blueprint.robotClay)
        const robots = Robots.add(this.robots, 0, 1, 0, 0)
        const node = new Node(minute, this.tree, robots, resNext)
        node.maximum()
      }
      if (canBuyObsidian && !canBuyGeode) {
        const resNext = Resources.sub(resources, blueprint.robotObsidian)
        const robots = Robots.add(this.robots, 0, 0, 1, 0)
        const node = new Node(minute, this.tree, robots, resNext)
        node.maximum()
      }
      if (canBuyGeode) {
        const resNext = Resources.sub(resources, blueprint.robotGeode)
        const robots = Robots.add(this.robots, 0, 0, 0, 1)
        const node = new Node(minute, this.tree, robots, resNext)
        node.maximum()
      }

    }

  }

}

///////////////////////////////////////////////////////////////

const maximumTime = 32
const Thread = require('node:worker_threads')
const notEatenBlueprints = Blueprint.ALL.slice(0, Math.min(Blueprint.ALL.length, 3))

if (Thread.isMainThread) {

  let results = []
  console.group()
  console.log('\n...This will take a few seconds.')
  for (const index in notEatenBlueprints) {

    const worker = new Thread.Worker(__filename, {
      argv: [argument]
    })
    worker.on('exit', code => {
      if (code !== 0) throw `Worker stopped with exit code ${code}`
    }).on('message', res => {

      results.push(res)
      console.log(`Finished Blueprint ${(res.index + 1).toString().padStart(2, '0')} | ${parseInt(results.length / notEatenBlueprints.length * 100).toLocaleString()}%`)
      
      if (results.length == notEatenBlueprints.length) {
        console.log(results)
        console.log(`\n The Product of all Maximum Geodes is ${results.reduce((acc, a) => acc * a.geodes, 1).toLocaleString()}\n`)
        console.groupEnd()
      }

    })

    worker.postMessage([maximumTime, index])

  }

} else {

  Thread.parentPort.once('message', ([maximumTime, index]) => {
    const tree = new Tree(maximumTime, Blueprint.ALL[index])
    console.group()
    console.log(`Processing Blueprint ${Blueprint.ALL[index].id.toString().padStart(2, '0')}`)
    console.groupEnd()
    const maximum = tree.maximum()
    Thread.parentPort.postMessage({
      index: parseInt(index),
      resources: maximum.dimension,
      geodes: maximum.geode
    })
  })

}
