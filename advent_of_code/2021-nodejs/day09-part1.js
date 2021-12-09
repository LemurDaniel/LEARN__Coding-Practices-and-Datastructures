const fs = require('fs');

// const input = fs.readFileSync('input/day09-input-test.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));
const input = fs.readFileSync('input/day09-input.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));

const lowpoints = [];

for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {

    let isLowPoint = true;
    const num = input[row][col];

    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const x = Math.round(Math.cos(angle)) + col;
      const y = Math.round(Math.sin(angle)) + row;
      if (y < 0 || y >= input.length) continue;
      if (x < 0 || x >= input[y].length) continue;

      if (input[y][x] <= num) {
        isLowPoint = false
        break
      }
    }
    if (isLowPoint) lowpoints.push(num);
  }
}

console.log(lowpoints)
console.log('Sum of risklevels: ' + lowpoints.map(v => v + 1).reduce((acc, num) => acc + num))