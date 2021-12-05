const fs = require('fs');
const readline = require('readline');

// const input = fs.readFileSync('input/day05-input-test.txt', 'utf-8').split('\r\n');
const input = fs.readFileSync('input/day05-input.txt', 'utf-8').split('\r\n');


const diagramm = {};

for (const line of input) {

  const points = line.replace(' -> ', ',').split(',').map(v => parseInt(v));
  let [x1, y1, x2, y2] = points;

  if (x1 === x2) {
    if (y1 > y2) [y2, y1] = [y1, y2]

    for (let i = y1; i <= y2; i++) {
      const point = [x1, i];
      if (point in diagramm)
        diagramm[point]++;
      else
        diagramm[point] = 1;
    }
  }

  else if (y1 === y2) {
    if (x1 > x2) [x2, x1] = [x1, x2]

    for (let i = x1; i <= x2; i++) {
      const point = [i, y1];
      if (point in diagramm)
        diagramm[point]++;
      else
        diagramm[point] = 1;
    }
  }
}



console.log('Number of overlapping Points: ' + Object.values(diagramm).filter(v => v > 1).length)