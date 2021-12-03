const fs = require('fs');
const readline = require('readline');


const binaries = readline.createInterface({
  // input: fs.createReadStream('./input/day03-input-test.txt')
  input: fs.createReadStream('./input/day03-input.txt')
});


var mostCommonBits = null;


binaries.on('line', binary => {

  if (mostCommonBits === null)
    mostCommonBits = new Array(binary.length).fill(0);

  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === '1')
      mostCommonBits[i]++;
    else
      mostCommonBits[i]--;
  }

});

binaries.on('close', () => {

  console.log(mostCommonBits)
  mostCommonBits = mostCommonBits.map(v => v > 0 ? 1 : 0).join('');

  const XORbinary = Number.MAX_SAFE_INTEGER >>> (32 - mostCommonBits.length);
  const gamma = parseInt(mostCommonBits, 2);
  const epsilon = gamma ^ XORbinary; // 0x00...11111


  console.log('Gamma: ' + gamma);
  console.log('Epsilon: ' + epsilon);
  console.log('Power Consumption: ' + (gamma * epsilon));

});
