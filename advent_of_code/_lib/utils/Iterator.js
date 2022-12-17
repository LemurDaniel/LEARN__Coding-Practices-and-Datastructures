

module.exports = class Iterator {

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

