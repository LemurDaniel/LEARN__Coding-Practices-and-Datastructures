



class Iterator {

  static *fromArray(array, reverse = false) {

    if (reverse) {
      for (let index = array.length - 1; index >= 0; index--) {
        const _end = index == 0
        yield [index, array[index], _end]
      }
    }
    else {
      for (let index = 0; index < array.length; index++) {
        const _end = index == array.length - 1
        yield [index, array[index], _end]
      }
    }

  }

  static *fromMatrix(matrix, verticalRows = true) {

    if (verticalRows) {
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          const _lineEnd = col + 1 == matrix[row].length
          yield [row, col, matrix[row][col], _lineEnd]
        }
      }
    }
    // Iterates Matrix rotated by 90° anticockwise with rows horizontally
    else {
      for (let col = matrix[0].length - 1; col >= 0; col--, str += '\n') {
        for (let row = 0; row < matrix.length; row++) {
          const _lineEnd = col - 1 < 0
          yield [row, col, matrix[row][col], _lineEnd]
        }
      }
    }

  }

}


class Depth {

  static #depth = 0

  static get current() {
    return Depth.#depth
  }

  static Track(func, ...args) {
    Depth.#depth++
    const result = func.call(null, ...args)
    Depth.#depth--
    return result
  }

}

// ############################################################################
// ######### PRINT METHODS
// ############################################################################

class Print {

  static RepeatedString(length, sequence = ' ') {
    return Array(length).fill(sequence).join('')
  }

  // Creates a unform String of the specified Sequence, padded with the specifed padding of specifed length
  // Length of the whole string. If Length is 4 and Sequence is of Length 2, only one whitespace is applied at each end
  // Sequence is placed in center and padded on both ends.
  static UniformString(length, sequence = '', padding = ' ') {

    sequence = Converter.toString(sequence)

    if (sequence.length >= length)
      return sequence

    const paddedArray = Array(length - sequence.length + 1).fill(padding)
    const center = Math.floor(paddedArray.length / 2)
    paddedArray[center] = sequence
    return paddedArray.join('')

  }

  ///////////////////////////////////////////////////////////////

  static fromMatrix(matrix, padding = 4, paddingCenter = true, verticalRow = true) {

    const printable = []

    let line = []
    for (let [row, col, val, _lineEnd] of Iterator.fromMatrix(matrix, verticalRow)) {

      val = Depth.Track(Converter.toString, val)
      val = paddingCenter ? Print.UniformString(padding, val) : val
      line.push(val)

      if (_lineEnd) {
        line.push('\n')
        const joiner = !paddingCenter ? Print.RepeatedString(padding) : ''
        line = line.join(joiner)
        printable.push(line)
        line = []
      }
    }

    const convertedString = printable.join('')
    // Remove `\n` from last line
    return convertedString.substring(0, convertedString.length - 1)
  }

  ///////////////////////////////////////////////////////////////

  static fromArray(argument, presentation = 0, maxLength = 100) {

    if (!Array.isArray(argument))
      return Depth.Track(Converter.toString, argument)


    switch (presentation) {
      case 0:
        presentation = ['[,]', '(,)']
        break
      case 1:
        presentation = ['[,]', '[,]']
        break
    }

    const lengthTracker = { value: maxLength }
    if (typeof maxLength != 'number')
      lengthTracker = maxLength


    // Loop through Array
    const brackets = presentation[
      Math.min(Depth.current, presentation.length - 1)
    ]

    const printable = [brackets[0]]
    for (let [index, value, _end] of Iterator.fromArray(argument)) {

      value = Depth.Track(Print.fromArray, value, presentation, maxLength)
      value = [' ', value, (!_end ? brackets[1] : ' ')].join('')
      printable.push(value)

      if (lengthTracker.value-- <= 0 && argument.length - index - 1 < 0) {
        printable.push(' >>> ' + (argument.length - index - 1) + ' more items ')
        break;
      }

    }
    printable.push(brackets[2])

    return printable.join('')

  }

  ///////////////////////////////////////////////////////////////

  fromMap() {
    return Print.fromObject()
  }
  fromObject() {
    throw "Not Implemented" // TODO
  }

}

class Converter {

  // Standard converter to convert arguments into string for display in console.
  static toString(object, referenceObject) {

    if (object === undefined)
      return '<undefined>'

    if (object === null)
      return '<null>'

    if (object.print)
      return arg.print()

    if (object instanceof Error)
      return arg.message

    if (object.constructor === String) {
      if (object.includes('\n'))
        return `\n'${object}'`;
      else
        return `'${object}'`;
    }

    if (object.constructor === Function)
      return `[Function (${!object.name ? 'anonymous' : object.name})]`

    if (Array.isArray(object))
      return Depth.Track(Print.fromArray, object)

    if (typeof object === 'object')
      return Depth.Track(Print.fromObject, object, referenceObject)

    return object.toString();
  }

  // Converts All Objects and any Substrings to the specified Datatype
  static fromObject(object, referenceObject) {

    if (object === null || object === undefined)
      return object

    if (typeof object === 'number')
      return object

    if (object instanceof Error)
      return { [object.name]: object }

    if (typeof object === 'string')
      return Depth.Track(Converter.fromString, object, referenceObject)

    for (const key of Object.keys(object)) {
      object[key] = Depth.Track(Converter.fromObject, object[key], referenceObject)
    }

  }

  // Converts All Strings to the specified Datatype
  static fromString(string, referenceObject) {

    if (typeof string !== 'string')
      throw `Argument invalid ${string}`

    if (string[0] !== '&') return string

    // TODO Not implemened
    const keychars = {
      '&NA': str => Helper.string_toArray(str),
      '&NI': str => Helper.string_toIntArray(str, ''),
      '&AR': str => Helper.string_toIntArray(str),
      '&PT': str => Helper.string_toIntArray(str).map(v => new Vector(v[0], v[1])),
      '&LL': str => LinkedList.LinkedListFromString(str),
      '&BT': str => BTree.BinaryTree.GenerateIntPreorderFromString(str),
      '&FS': str => {
        const args = Helper.string_toArray(str);
        const file = fs.readFileSync(args[0], 'utf-8');
        return convertString(args[1] + ' ' + file);
      },
      '&RF': str => str.split('.').reduce((obj, key) => obj[key], referenceObject)
    }

    const chars = str.substr(0, 3);
    const substr = str.substr((str[3] == ' ' ? 4 : 3), str.length);

    if (chars in keychars)
      return keychars[chars](substr);
    else
      return str;

  }

  static ArrayFromString() {
    throw "Not Implemented" // TODO
  }
}


module.exports = {
  Iterator,
  Print,
  Converter
}