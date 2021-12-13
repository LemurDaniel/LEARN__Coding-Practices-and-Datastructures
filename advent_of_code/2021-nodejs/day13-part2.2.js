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

  console.log('   Doing Fold: ' + (i + 1))
  const [axis, value] = INTSTRUCTIONS[i];

  let foldingLambda = (x, y) => [x, y];
  if (axis === 'x') {
    dimensions[0] = (dimensions[0] - 1) / 2;
    foldingLambda = (x, y) => [2 * value - x, y];
  }

  else if (axis === 'y') {
    dimensions[1] = (dimensions[1] - 1) / 2;
    foldingLambda = (x, y) => [x, 2 * value - y];
  }


  for (const point of Object.keys(paper)) {
    const [x, y] = point.split(',').map(v => Number(v));;
    if (axis === 'x' && x <= value) continue;
    if (axis === 'y' && y <= value) continue;

    const folded = foldingLambda(x, y);
    // console.log(point + ' ==> ' + folded)
    paper[folded] = paper[point];
    delete paper[point];
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