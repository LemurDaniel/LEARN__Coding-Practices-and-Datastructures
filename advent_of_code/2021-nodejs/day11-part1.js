const fs = require('fs');

// const octopuses = fs.readFileSync('input/day11-input-test.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));
const octopuses = fs.readFileSync('input/day11-input.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));

var totalNumberOfFlashes = 0;

function runStep() {

  let flashes = 0;
  const flashedOctopuses = [];

  for (let row = 0; row < octopuses.length; row++) {
    for (let col = 0; col < octopuses[row].length; col++) {
      if (octopuses[row][col] === -1)
        octopuses[row][col] = 1;
      else if (octopuses[row][col] === 9) {
        flashedOctopuses.push([row, col]);
        octopuses[row][col] = -1;
        flashes++;
      } else
        octopuses[row][col]++
    }
  }


  for (const pos of flashedOctopuses) {

    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      const y = Math.round(Math.sin(angle)) + pos[0];
      const x = Math.round(Math.cos(angle)) + pos[1];

      if (y < 0 || y >= octopuses.length) continue;
      else if (x < 0 || x >= octopuses[y].length) continue;
      else if (octopuses[y][x] === -1) continue;
      else if (octopuses[y][x]++ === 9) {
        flashedOctopuses.push([y, x]);
        octopuses[y][x] = -1;
        flashes++;
      }
    }
  }

  return flashes;
}

for (let steps = 0; steps < 100; steps++) {

  const flashes = runStep();
  totalNumberOfFlashes += flashes;
  console.log(`Number of Flashes at Step ${steps + 1}: ${flashes}`)
  // console.log(octopuses.map( row => row.map( v => v === -1 ? 0 : v).join('')))
  // console.log('###############')
}

console.log('Total number of flashes: ' + totalNumberOfFlashes);