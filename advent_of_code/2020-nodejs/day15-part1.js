const fs = require('fs');

const file = fs.readFileSync('./input/day15-input.txt', 'utf-8').split(',');


let turn = 1;
let map = {};
let num = file[file.length - 1];

for (let i = 0; i < file.length - 1; i++) {
  map[file[i]] = turn++;
}

//console.log(map)

while (turn < 2020) {
  if (num in map) new_n = turn - map[num];
  else new_n = 0;

  map[num] = turn;
  num = new_n;

  turn++;
}

//console.log(map)
console.log('The spoken number at turn 2020 is: ' + num)