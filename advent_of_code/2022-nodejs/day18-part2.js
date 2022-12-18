const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day18-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day18-part2.js INPUT'    to process Todays input from 'day18-input.txt'.
//
//  Enter:
//    'node .\day18-part2.js TEST'     to process Todays Testinput from 'day18-input-test.txt'.
//    'node .\day18-part2.js'          to process Todays Testinput from 'day18-input-test.txt'.

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
const Queue = Datastructures.ArrayQueue
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
  static MAX = new Vector3D(-Infinity, -Infinity, -Infinity)
  static MIN = new Vector3D(Infinity, Infinity, Infinity)

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

    // Update minimum and Maximum
    Cube.MIN.transform(Math.min, this)
    Cube.MAX.transform(Math.max, this)

    Cube.ALL[this] = this
    this.#freeSides = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
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

function filterAirPockets() {

  // Extend bounds by one so that a Bounding-Box containing the everything can be traversed.
  const max = Vector3D.add(Cube.MAX, 1, 1, 1)
  const min = Vector3D.sub(Cube.MIN, 1, 1, 1)

  // Create a Map of all possible positions in the Bounding Box.
  // Don't include any positions with cubes, only positions with air.
  const nonReachable = {}

  for (let x = min.x; x <= max.x; x++) {
    for (let y = min.y; y <= max.y; y++) {
      for (let z = min.z; z <= max.z; z++) {
        const vector = new Vector3D(x, y, z)
        if (vector in Cube.ALL)
          continue
        else
          nonReachable[vector] = vector
      }
    }
  }

  ////////////////////////

  // Start traversing from position min and reaching every air position
  const queue = new Queue(1_000)
  const visited = {}
  queue.enqueue(min)

  while (!queue.isEmpty) {
    const position = queue.dequeue()

    // Consider all other moves from this current position
    const directions = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
    ].map(vector => Vector3D.add(position, ...vector))

    for (const vector of directions) {

      // If positions is a Cube, then ignore.
      if (vector in Cube.ALL)
        continue

      // if position is Out-of-Bounds, then ignore.
      if (vector.x > max.x || vector.y > max.y || vector.z > max.z
        || vector.x < min.x || vector.y < min.y || vector.z < min.z)
        continue

      // don't revisit already visisted positions
      if (vector in visited)
        continue

      // if position is in unreachable, delete, since it is reachable.
      // then continue checking any subsequent visible nodes
      delete nonReachable[vector]
      visited[vector] = true
      queue.enqueue(vector)
    }
  }

  ////////////////////////

  // Merge all cluster into one cluster.
  const masterCluster = Object.values(Cluster.ALL).reduce((cluster0, cluster1) => cluster0.merge(cluster1))

  // For each Air-Pocket, the surface of all surrounding cubes must be considered. 
  // This also means, that some Air-Position with no immediate adjacent cube, add nothing to the surface of the Air-Pocket overall.
  let surfaceCoveredAirPockets = 0
  for (const vector of Object.values(nonReachable)) {

    // For each nonReachable Position, => Air-Position in an Air-Pocket,
    // check if there is a stored side in the cluster.
    // if so, then add the amount of adjacent cubes on this side
    if (vector in masterCluster.freeSides)
      surfaceCoveredAirPockets += masterCluster.freeSides[vector].length
  }

  // return an object with some info.
  return {
    surfaceArea: Cluster.surfaceArea,
    airPockets: surfaceCoveredAirPockets,
    actualArea: (Cluster.surfaceArea - surfaceCoveredAirPockets)
  }
}

///////////////////////////////////////////////////////////////

// Process all Cubes

Input.map(cube => new Cube(...cube.split(',')))
  .forEach(cube => Cluster.Add(cube))

const result = filterAirPockets()

if (argument.includes('TEST'))
  console.log(Cluster.ALL)
else
  console.log()

console.log('///////////////////////////////////////////////////////////////')
console.group()
console.log(`\nThe Surface Area accross all cubes is '${result.surfaceArea.toLocaleString()}'`)
console.log(`However Air-Pockets where found covering a surface of '${result.airPockets.toLocaleString()}'`)
console.log(`This means the acutal surface is '${result.actualArea.toLocaleString()}'`)
console.groupEnd()
console.log()