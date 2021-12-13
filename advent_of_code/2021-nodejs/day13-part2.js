const fs = require('fs');

// const input = fs.readFileSync('input/day13-input-test.txt', 'utf-8').split('\n\r\n');
const input = fs.readFileSync('input/day13-input.txt', 'utf-8').split('\n\r\n');


const POINTS = input[0].split('\r\n').
  map(v => v.split(',').map(v => Number(v)));

const INTSTRUCTIONS = input[1].split('\r\n').
  map(v => v.substr(11).split('=').map((v, i) => i === 0 ? v : Number(v)));


const dimensions = [0, 0];
const paper = {};

for (const point of POINTS) {
  paper[point] = '#';
  dimensions[0] = Math.max(point[0] + 1, dimensions[0])
  dimensions[1] = Math.max(point[1] + 1, dimensions[1])
}



for (let i = 0; i < INTSTRUCTIONS.length; i++) {

  const [axis, value] = INTSTRUCTIONS[i];

  if (axis === 'x') {

    dimensions[0] = (dimensions[0] - 1) / 2;
    for (let x = 1; x <= dimensions[0]; x++) {
      for (let y = 0; y < dimensions[1]; y++) {
        const left = [value - x, y];
        const right = [value + x, y];

        if (!(right in paper)) continue;

        // console.log(right + ' ==> ' + left)
        paper[left] = paper[right];
        delete paper[right];
      }
    }
  }

  else if (axis === 'y') {

    dimensions[1] = (dimensions[1] - 1) / 2;
    for (let y = 1; y <= dimensions[1]; y++) {
      for (let x = 0; x < dimensions[0]; x++) {
        const top = [x, value - y];
        const bottom = [x, value + y];

        if (!(bottom in paper)) continue;

        // console.log(bottom + ' ==> ' + top)
        paper[top] = paper[bottom];
        delete paper[bottom];
      }
    }
  }
}





console.log()
for (let y = 0; y < dimensions[1]; y++) {

  let line = '    ';
  for (let x = 0; x < dimensions[0]; x++) {
    const point = [x, y];
    if (point in paper) line += '#';
    else line += ' '
  }
  console.log(line)
}
console.log();