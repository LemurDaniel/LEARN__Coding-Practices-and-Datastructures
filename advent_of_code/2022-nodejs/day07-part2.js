const fs = require('fs');

var fileContent = fs.readFileSync('input/day07-input.txt', 'utf-8')
// fileContent = fs.readFileSync('input/day07-input-test.txt', 'utf-8')

const input = fileContent.split('\r\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


// Create Node Tree
class Node {

  constructor(name, prev) {
    this.name = name
    this.fileSystem = {
      '.': this,
      '..': prev
    }
  }

  getElement(name) {
    return this.fileSystem[name]
  }

  addDirectory(name) {

    if (null == this.fileSystem[name])
      this.fileSystem[name] = new Node(name, this)

    return this.getElement(name)

  }

  addFile(name, size) {

    if (null != this.fileSystem[name]) {
      console.log(Object.keys(this.fileSystem))
      const test = `Error at '${this.name}' - '${name}' File Exists`
      throw test
    } else {
      this.fileSystem[name] = parseInt(size)
    }

  }


  // Create Iterator that excludes '..' and '.', to easily iterate like (for(const {obj} of this) { ... }})
  *[Symbol.iterator]() {

    for (const [name, obj] of Object.entries(this.fileSystem)) {

      if (!['..', '.'].includes(name))
        yield { name: name, obj: obj }

    }

  }

  printAllFiles(path = ['']) {

    for (const { name, obj } of this) {

      const pathCurrent = [...path, name]
      if (obj instanceof Node)
        obj.printAllFiles(pathCurrent)
      else
        console.log(pathCurrent.join('/'), ' - ', obj)

    }

  }

  getDirectorySizes(directorySizes = {}, path = ['']) {

    const pathCurrent = [...path, this.name]
    const sizeCurrent = Array.from(this)
      .map(({ obj }) =>
        (obj instanceof Node) ? obj.getDirectorySizes(directorySizes, pathCurrent).sizeCurrent : obj
      )
      .reduce((acc, a) => acc + a)

    directorySizes[pathCurrent.join('/').replace(/\/+/, '/')] = sizeCurrent
    return { directorySizes, sizeCurrent }
  }

}


// Process Input to tree
const root = new Node()
let current = root

input
  .map(line => line.replace(/\$\s+/, '').split(/\s+/))
  .forEach(([inst, arg]) => {
    // console.log(current.filePath, '  ', inst, arg, '  ', current.filePath)
    if (inst == 'cd')
      current = arg == '/' ? root : current.getElement(arg)
    else if (inst == 'dir')
      current.addDirectory(arg)
    else if (inst == 'ls')
      null
    else
      current.addFile(arg, inst)
  })




///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get Map of All Directories with their sizes
const { directorySizes, sizeCurrent: rootSize } = root.getDirectorySizes()

const TotalSpace = 70000000
const neededSpace = 30000000
const unusedSpace = TotalSpace - rootSize
const spaceToFree = neededSpace - unusedSpace

const smallestDeletebleDirectory = Object.entries(directorySizes)
  .map(([name, size]) => ({ name: name, size: size }))
  .filter(directory => directory.size >= spaceToFree)
  .reduce((minimum, directory) =>
    minimum = directory.size > minimum.size ? minimum : directory
  )

console.log()
console.log(` - A Total of '${neededSpace.toLocaleString()}' is needed for the Update`)
console.log(` - There is still '${unusedSpace.toLocaleString()}' unused Space available`)
console.log(` - To install the Update an additional '${spaceToFree.toLocaleString()}' need to be freed`)

console.log()
console.log(`The smallest Directory to Delete, to accomplish that is '${smallestDeletebleDirectory.name}' with a size of '${smallestDeletebleDirectory.size.toLocaleString()}'`)
console.log()
