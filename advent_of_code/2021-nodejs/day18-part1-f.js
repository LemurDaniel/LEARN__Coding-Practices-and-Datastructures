const fs = require('fs');
const Helper = require('../../nodejs/Helper')
// const input = '[[[[[9,8],1],2],3],4]'
// const input = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]';
// const input = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]'

const input = '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]];[7,[[[3,7],[4,3]],[[6,3],[8,8]]]];[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]];[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]];[7,[5,[[3,8],[1,4]]]];[[2,[2,2]],[8,[8,1]]];[2,9];[1,[[[9,3],9],[[9,0],[0,7]]]];[[[5,[7,4]],7],1];[[[[4,2],2],6],[8,7]]'.split(';')

// const input = '[[[[4,3],4],4],[7,[[8,4],9]]];[1,1]'.split(';')

Object.defineProperty(Array.prototype, "top", {
  get: function () {
    return this[this.length - 1];
  },
});


function convertToArray(str) {

  const stack = [];

  for (let i = 0; i < str.length - 1; i++) {
    const char = str[i];

    if (char === '[')
      stack.push([]);
    else if (Number.isInteger(Number(char)))
      stack.top.push(Number(char))
    else if (char === ']') {
      const arr = stack.pop();
      stack.top.push(arr);
    }
  }

  return stack.pop();
}


function reduceSnailfishNumber(array) {

  const topMostArray = array;
  const stack = [[array, 0]];
  let lastLiteral = null;

  let isExploding = false;
  let explodedValue = null;

  while (stack.length > 0) {

    array = stack.top[0]
    for (let index = stack.pop()[1]; index < array.length; index++) {

      const element = array[index];

      if (Array.isArray(element) && (stack.length < 3 || isExploding)) {
        stack.push([array, index + 1]);
        array = element;
        index = -1;

      } else if (Array.isArray(element)) {
        // explode
        array[index] = 0;

        // explode to left.
        if (lastLiteral !== null) {
          if (array === lastLiteral.array)
            array[index - 1] += element[0];
          else
            lastLiteral.array[lastLiteral.i] += element[0];
        }

        // explode to right
        isExploding = true;
        explodedValue = element[1];
      }

      else if (isExploding) {
        array[index] += explodedValue;
        isExploding = false;
        explodedValue = null;

        if (lastLiteral !== null || index < 2) {
          // Start from beginning again.
          array = topMostArray;
          lastLiteral = null;
          stack.length = 0;
          index = -1;

        } else
          index -= 2;

      }

      else if (element >= 10) {
        const split = [
          Math.floor(array[index] / 2),
          Math.ceil(array[index] / 2)
        ]
        array[index--] = split;
      }

      else {
        lastLiteral = { array: array, i: index };
      }
    }

    if (stack.length === 0 && isExploding && lastLiteral !== null) {
      isExploding = false;
      explodedValue = null;
      lastLiteral = null;
      // Start from beginning again.
      stack.length = 0;
      stack.push([topMostArray, 0]);
    }
  }

}




for (let num = convertToArray(input[0]), i = 1; i < 2; i++) {

  let addend = convertToArray(input[i]);
  num = [num, (addend)];
  console.log(Helper.printArray(num));
  reduceSnailfishNumber(num);
  console.log(Helper.printArray(num));
  reduceSnailfishNumber(num);
  console.log(Helper.printArray(num));
}