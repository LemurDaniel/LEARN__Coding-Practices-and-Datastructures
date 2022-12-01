const fs = require('fs');
const Helper = require('../../nodejs/Helper');

// const input = fs.readFileSync('input/day15-input-test.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));
const input = fs.readFileSync('input/day15-input.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));

const SCALE_BY = 5;

for (let i = 1, initalSize = input.length; i < SCALE_BY; i++) {
  for (let row = 0; row < initalSize; row++) {
    input.push(input[row].map(
      v => v + i > 9 ? (v + i + 1) % 10 : v + i
    ))
  }
}

for (let row = 0; row < input.length; row++) {
  const newRow = [input[row]];
  for (let i = 1; i < SCALE_BY; i++) {
    newRow.push(input[row].map(
      v => v + i > 9 ? (v + i + 1) % 10 : v + i
    ))
  }
  input[row] = newRow.flat();
}

// console.log(Helper.printMatrix(input, true, 2))


const table = {
  '0,0': { previous: [0, 0], cost: 0 }
};

const nodeCount = input.length * input[0].length;
let counter = 0;

const visited = {};
const toBeVisited = [[0, 0]];

while (toBeVisited.length > 0) {

  if (++counter % 1000 === 0)
    console.log('Visited ' + counter + ' Nodes of ' + nodeCount);

  const pos = toBeVisited.pop()
  const [row, col] = pos;
  for (const [y, x] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
    const rowNew = row + y;
    const colNew = col + x;

    if (rowNew < 0 || rowNew >= input.length) continue;
    if (colNew < 0 || colNew >= input[rowNew].length) continue;

    const posNew = [rowNew, colNew];
    const cost = input[rowNew][colNew] + table[pos].cost;

    if (posNew in visited) continue;
    toBeVisited.push(posNew);
    visited[posNew] = true;

    if (!(posNew in table) || table[posNew].cost > cost) {
      table[posNew] = { previous: [row, col], cost: cost };
    }
  }

  toBeVisited.sort((a, b) => table[b].cost - table[a].cost)
  //console.log(toBeVisited.map( v => table[v].cost))
}


/*
let pos = [input.length - 1, input[0].length - 1];
let accumulatedCost = 0;
while (pos[0] > 0 && pos[1] > 0) {
  const { previous, cost } = table[pos];
  pos = previous;
  accumulatedCost += cost;
  console.log(cost)
}

console.log(table)
console.log(accumulatedCost)
*/

console.log('\n\n   Minimal risk path: ' + table[
  [input.length - 1, input[0].length - 1]
].cost + '\n')