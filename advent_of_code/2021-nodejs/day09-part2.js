const fs = require('fs');

// const input = fs.readFileSync('input/day09-input-test.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));
const input = fs.readFileSync('input/day09-input.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));


const basinSizes = []

for (let row = 0; row < input.length; row++) {
  for (let col = 1; col < input[row].length; col++) {

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

    if (isLowPoint)
      basinSizes.push(determineBasinRecursive(row, col));
  }
}


function determineBasinRecursive(row, col, visited = {}) {
  if (visited[[row, col]]) return 0;
  else visited[[row, col]] = true;

  if (row < 0 || row >= input.length) return 0;
  if (col < 0 || col >= input[row].length) return 0;
  if (input[row][col] === 9) return 0;

  let size = 1;
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
    const x = Math.round(Math.cos(angle)) + col;
    const y = Math.round(Math.sin(angle)) + row;
    size += determineBasinRecursive(y, x, visited);
  }
  return size;
}


console.log('Product of three largest basins: ' + basinSizes.sort((a, b) => b - a).slice(0, 3).reduce((acc, num) => acc * num))