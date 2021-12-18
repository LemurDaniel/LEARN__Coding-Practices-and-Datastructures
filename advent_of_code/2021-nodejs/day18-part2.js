const fs = require('fs');
const { exit } = require('process');
const Helper = require('../../nodejs/Helper')

Object.defineProperty(Array.prototype, "top", {
  get: function () {
    return this[this.length - 1];
  },
});

const DEBUG = false;

input = fs.readFileSync('./input/day18-input-test2.txt', 'utf-8').split('\r\n').map(v => v.trim())
input = fs.readFileSync('./input/day18-input.txt', 'utf-8').split('\r\n').map(v => v.trim())

class StringWrapper {

  get length() {
    return this.string.length;
  }

  constructor(string) {
    this.string = string;
  }


  get(index) {
    return this.string[index];
  }

  isDigit(index) {
    return Number.isInteger(Number(this.string[index]));
  }

  addSnailFishNumber(number) {
    this.string = '[' + this.string + ',' + number + ']';
  }


  num(index) {
    return this._num(index)[0];
  }

  numBounds(index) {
    return this._num(index).slice(1);
  }

  _num(index) {
    if (!this.isDigit(index)) return [Number.NaN, -1, -1];

    let start = index;
    while (this.isDigit(start)) start--;
    while (this.isDigit(index)) index++;

    return [
      Number(this.string.substring(start + 1, index)),
      start + 1, index
    ];
  }

  splice(start, deleteCount = 0, chars = '') {
    const deletion = this.string.substring(start, start + deleteCount);

    this.string = this.string.substring(0, start) + chars +
      this.string.substring(start + deleteCount);

    return deletion;
  }
}

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

function getMagnitudeOfArray(array) {
  if (Number.isInteger(array)) return array;

  return 3 * getMagnitudeOfArray(array[0])
    + 2 * getMagnitudeOfArray(array[1]);
}


function split(wrapper) {

  for (let i = 0; i < wrapper.length; i++) {
    const num = wrapper.num(i);

    if (Number.isNaN(num) || num <= 9) continue;
    const split = [
      Math.floor(num / 2),
      Math.ceil(num / 2)
    ].toString();

    wrapper.splice(i, (num + '').length, `[${split}]`);
    if (DEBUG) console.log('   split: ' + num)

    return true;
  }

  return false;
}


function explode(wrapper) {

  for (let i = 0, depth = 0; i < wrapper.length; i++) {
    const el = wrapper.get(i);

    if (el === '[') depth++;
    else if (el === ']') depth--;

    if (depth <= 3 || el !== ']') continue;

    let start = i;
    while (wrapper.get(start) !== '[') start--;

    // explode
    const nums = wrapper.splice(start, i - start + 1, 0)
      .substring(1, i - start)
      .split(',').map(v => Number(v));

    if (DEBUG) {
      console.log('   explode: ' + nums, ' --- ', start, wrapper.get(start));
    }

    // explode left
    let index = start - 2;
    while (index >= 0 && !wrapper.isDigit(index)) index--;
    if (index > 0) {
      let [numStart] = wrapper.numBounds(index)
      let num = wrapper.num(index);
      let sum = num + nums[0];
      wrapper.splice(numStart, (num + '').length, sum);
    }

    // explode right
    index = start + 2;
    while (index < wrapper.length && !wrapper.isDigit(index)) index++;
    if (index < wrapper.length) {
      let [numStart] = wrapper.numBounds(index)
      let num = wrapper.num(index);
      let sum = num + nums[1];
      wrapper.splice(numStart, (num + '').length, sum);
    }
    return true
  }

  return false;
}


// Solve brute force all permutations.
let largestMagnitude = 0;

console.log();
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    const snailFishNumber = new StringWrapper(input[i]);
    snailFishNumber.addSnailFishNumber(input[j]);

    while (explode(snailFishNumber) || split(snailFishNumber));

    const array = convertToArray(snailFishNumber.string);
    const result = getMagnitudeOfArray(array);
    largestMagnitude = Math.max(largestMagnitude, result);
  }
  console.log('  Processed ' + ((i + 1) * input.length) + ' Numbers');
}

console.log('\n   Largest Magnitude: ' + largestMagnitude + '\n');

