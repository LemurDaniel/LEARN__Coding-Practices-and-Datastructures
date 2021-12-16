const fs = require('fs');
const Helper = require('../../nodejs/Helper');

// const input = fs.readFileSync('input/day15-input-test.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));
const input = fs.readFileSync('input/day15-input.txt', 'utf-8').split('\r\n').map(v => v.split('').map(v => Number(v)));


const nodeCount = input.length * input[0].length;

const table = {
  '0,0': { previous: [0, 0], cost: 0 }
};

let counter = 0;
const visited = {};
const toBeVisited = [[0, 0]];

while (toBeVisited.length > 0) {

  if (++counter % 100 === 0)
    console.log('Visited ' + counter + ' Nodes of ' + nodeCount);

  // Find smallest nonVisited
  let index = 0;
  let pos = toBeVisited[0];
  for (let i = 1; i < toBeVisited.length; i++) {
    const nextPos = toBeVisited[i];
    if (table[nextPos].cost < table[pos].cost) {
      pos = nextPos;
      index = i;
    }
  }
  // console.log(pos, table[pos], '####', toBeVisited.map( v => table[v]))
  toBeVisited.splice(index, 1);


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