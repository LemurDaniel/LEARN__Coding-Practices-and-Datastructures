
const Vector = require('../datastructures/Vector')
const Iterator = require('./Iterator')

class Depth {

  static #depth = 0

  static get current() {
    return Depth.#depth
  }

  static Track(func, ...args) {
    if (Depth.#depth < 0) throw 'Error'
    Depth.#depth++
    const result = func.call(null, ...args)
    Depth.#depth--
    return result
  }

}

// ############################################################################
// ######### PRINT METHODS
// ############################################################################

class Print extends Depth {

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

  static fromArray(argument, presentation = 0, converter = Print.fromArray, maxLength = 100) {

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

      value = Depth.Track(converter, value, presentation, maxLength)
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

class Converter extends Depth {

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
        return object
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

    // Try Converting String to specified Datatype
    const keyChars = string.substring(0, 3)
    string = string.substring(3).trim()
    switch (keyChars) {

      case '&NA':
        return Converter.IntArrayFromString(string)
      case '&NI':
        return string.split('').map(num => parseInt(num))
      case '&AR':
        return Converter.BaseArrayFromString(string)
      case '&PT':
        return Converter.IntArrayFromString(string).map(v => new Vector(v[0], v[1]))
      case '&LL':
        return LinkedList.LinkedListFromString(string)
      case '&BT':
        return BTree.BinaryTree.GenerateIntPreorderFromString(string)
      case '&FS':
        const args = Converter.BaseArrayFromString(string)
        return Converter.fromString(args[1] + fs.readFileSync(args[0], 'utf-8'))
      case '&RF':
        return Converter.BaseArrayFromString(string)

      default:
        throw `Not Supported '${keyChars}'`
    }

  }

  static BaseArrayFromString(string, converter = Converter.fromString, splitOrder = '\r\n\r\n´\r\n´|´;´,´ ') {

    if (typeof string !== 'string')
      throw 'Invalid Operation'
    else if (string[0] === '&' && Depth.current > 0)
      return Depth.Track(Converter.fromString, string)


    // Try splitting and parsing array
    const splitter = splitOrder.split('´').reverse()
      .filter(splitter => string.includes(splitter))

    if (splitter.length > 0) {
      const array = string.split(splitter.pop())
      for (const index in array) {
        array[index] = Depth.Track(Converter.BaseArrayFromString, array[index], converter, splitOrder)
      }
      return array
    }

    // Special if array is sequence of characters and not an entry of a subarray.
    else if (Depth.current === 0)
      return string.split('').map(converter)

    // If string can't be split further, return
    // console.log(string)
    return converter(string)


  }

  static IntArrayFromString(string) {

    const intConverter = value => {

      // Parse Binary-Encoded values
      // parseInt ignores 0b and reads as normal int
      // 0x gets interpreted as Hex correctly
      if (/0b\d+/.test(value))
        return parseInt(value.substr(2), 2)

      // Special parse number as any base
      else if (/^-{0,1}\d+#{1}b{1}\d+$/.test(value))
        return parseInt(...value.split('#b'))

      else if (value.includes('.'))
        return isNaN(parseFloat(value)) ? value : parseFloat(value)

      else if (/^-{0,1}\d+$/.test(value))
        return parseInt(value)

      else
        return value
    }

    return Depth.Track(Converter.BaseArrayFromString, string, intConverter)
  }
}

module.exports = {
  Print,
  Converter
}