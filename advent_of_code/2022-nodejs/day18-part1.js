const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day18-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day18-part1.js INPUT'    to process Todays input from 'day18-input.txt'.
//
//  Enter:
//    'node .\day18-part1.js TEST'     to process Todays Testinput from 'day18-input-test.txt'.
//    'node .\day18-part1.js'          to process Todays Testinput from 'day18-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day18-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day18-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n')

// Get Needed Classes
const Vector3D = Datastructures.Vector3D

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


// All position with an array, refering to their connections
//  - Each Point is a Cube with 6 Sides, therefore 6 possible connections
//  - Are there non-reachable cubes with no sides connected?
//  - Are there different cubes, where con set of cubes isn't connected to another set of cubes?

class Cube extends Vector3D {

  static ALL = {}

  #surfaceArea
  #freeSides
  get freeSides() {
    return Object.values(this.#freeSides)
  }

  get surfaceArea() {
    return this.#surfaceArea
  }

  constructor(x, y, z) {
    super(x, y, z)

    // Cube has default 6 sides.
    this.#surfaceArea = 6

    Cube.ALL[this] = this
    this.#freeSides = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ].map(vector => Vector3D.add(this, ...vector))
      .reduce((obj, vec) => ({ ...obj, ...({ [vec]: vec }) }), new Object())
  }

  removeFreeSide(vector) {
    if (vector in this.#freeSides) {
      delete this.#freeSides[vector]
      this.#surfaceArea--
    }
  }

  connectTo(cube) {
    this.removeFreeSide(cube)
    cube.removeFreeSide(this)
  }

}

///////////////////////////////////////////////////////////////

class Cluster {

  static #ID = 0
  static ALL = {}

  // Search all clusters for an existing cluster, where Cube exists
  //  - Non-Found: Create new Cluster
  //  - One-Found: Add Cube to Cluster
  //  - Multiple-Found: Add Cube and merge Clusters, since those are now connected.
  // 
  //  Check for any Added Cube, which Cubes can be reached and haven't been reached yet,
  //  return those for further processing.
  static Add(cube) {

    const clusters = Object.values(Cluster.ALL)
      .filter(cluster => cube in cluster.freeSides)


    if (clusters.length == 0)
      new Cluster(cube)

    else if (clusters.length > 0)
      clusters.reduce((cluster0, cluster1) => cluster0.merge(cluster1)).storeCube(cube)

    else
      clusters[0].storeCube(cube)

  }

  static get count() {
    return Object.keys(Cluster.ALL).length
  }

  static get surfaceArea() {
    return Object.values(Cluster.ALL)
      .reduce((acc, cluster) => acc + cluster.surfaceArea, 0)
  }

  ///////////////////////////////////////////////////////////////

  // Not enough to count the number of freeside, since a freeside can be the freeside of multiple cubes.
  get surfaceArea() {
    return Object.values(this.storedCubes)
      .reduce((acc, cube) => acc + cube.surfaceArea, 0)
  }

  constructor(cube) {
    this.id = Cluster.#ID++
    Cluster.ALL[this.id] = this

    // Keeps tracks of all connection sides of the current cluster
    this.freeSides = {}
    for (const freeSide of cube.freeSides) {
      this.freeSides[freeSide] = [cube] // Freeside of that cube.
    }
    this.storedCubes = {
      [cube]: cube
    }

    // Debugging
    this.connects = {}
  }

  merge(cluster) {

    this.storedCubes = {
      ...this.storedCubes,
      ...cluster.storedCubes
    }

    for (const side of Object.keys(cluster.freeSides)) {

      if (side in this.freeSides)
        this.freeSides[side] = [...this.freeSides[side], ...cluster.freeSides[side]]
      else
        this.freeSides[side] = cluster.freeSides[side]

    }

    delete Cluster.ALL[cluster.id]
    return this
  }

  storeCube(cube) {
    if (cube in this.storedCubes) return

    for (const connector of this.freeSides[cube]) {
      //>> Debugging
      this.connects[cube] = (this.connects[cube] ? this.connects[cube] + '; ' : '') + [connector.toString()]
      this.connects[connector] = (this.connects[connector] ? this.connects[connector] + '; ' : '') + [cube.toString()]
      //<< Debugging

      connector.connectTo(cube)
    }

    for (const side of cube.freeSides) {
      if (side in this.freeSides)
        this.freeSides[side].push(cube)
      else
        this.freeSides[side] = [cube]
    }

    // Store cube and delete now unfree side.
    this.storedCubes[cube] = cube
    delete this.freeSides[cube]
  }

}

///////////////////////////////////////////////////////////////

// Process all Cubes

Input.map(cube => new Cube(...cube.split(',')))
  .forEach(cube => Cluster.Add(cube))

if (argument.includes('TEST'))
  console.log(Cluster.ALL)
else
  console.log()

console.log('///////////////////////////////////////////////////////////////')
console.group()
console.log(`\nA total of ${Cluster.count} Clustered-Rock-Formations have been found.`)
console.log(`The Surface Area accross all is ${Cluster.surfaceArea.toLocaleString()}.`)
console.groupEnd()
console.log()