const fs = require('fs');
const readline = require('readline');


// const binaries = fs.readFileSync('./input/day03-input-test.txt', 'utf-8').split('\r\n');
const binaries = fs.readFileSync('./input/day03-input.txt', 'utf-8').split('\r\n');


function getLifeSupport(binaries, rating) {

  for (let bitPosition = 0; bitPosition < binaries[0].length && binaries.length > 1; bitPosition++) {

    let mostCommonBit = 0;
    for (let i = 0; i < binaries.length; i++) {
      const bit = binaries[i][bitPosition];

      if (bit === '1')
        mostCommonBit++;
      else
        mostCommonBit--;
    }

    let leastCommonBit = mostCommonBit >= 0 ? '0' : '1';
    mostCommonBit = leastCommonBit === '0' ? '1' : '0';
    let ptrStart = 0;

    for (let i = 0; i < binaries.length; i++) {
      const bit = binaries[i][bitPosition];

      //console.log( bit + '   ' + mostCommonBit + (bit != mostCommonBit) )
      if (bit === mostCommonBit && rating === 'OXY')
        binaries[ptrStart++] = binaries[i];
      else if (bit === leastCommonBit && rating === 'C02')
        binaries[ptrStart++] = binaries[i];
    }

    binaries.length = ptrStart;
  }

  return parseInt(binaries[0], 2);
}

let oxy = getLifeSupport(binaries.map(v => v), 'OXY');
let c02 = getLifeSupport(binaries.map(v => v), 'C02');

console.log('Oxygen Rating: ' + oxy);
console.log('C02 Rating: ' + c02);
console.log('Life Support Rating: ' + (oxy * c02));