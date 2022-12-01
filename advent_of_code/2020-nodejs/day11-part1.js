const fs = require('fs');

const file = fs.readFileSync('./input/day11-input.txt', 'utf-8').split('\r\n').join('');

// Start Solving

const row_len = 91; // The length of a line left to right
const col_len = 94; // The length of a column top to bottom
//const row_len = 10;

const st_ety = 'L';
const st_fl = '#';
const floor = '.';

/*
If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.*/

// row_delta, col_delta
const move_deltas = [
  [0, 1], [0, -1], // Horizontal
  [1, 0], [-1, 0], // vertical
  [1, 1], [1, -1],  // Diagonal
  [-1, 1], [-1, -1] // Diagonal
]


function countSurrounding(indx, map, char) {

  // +row_len and -1 compensates for indx=0
  let row = Math.floor((indx + row_len) / row_len) - 1;
  let col = indx % row_len;
  let moves = [];

  // col+row to absolute pos in array
  let clc_abs = (row, col) => {
    if (row < 0 || row >= col_len) return -1;
    if (col < 0 || col >= row_len) return -1;
    return (row) * row_len + col;
  };

  // generates pos for moves
  move_deltas.forEach(delta => {
    moves.push(clc_abs(row + delta[0], col + delta[1]))
  });

  let count = 0;
  moves.forEach(move => {
    if (move <= 0 || move >= map.length) return;
    else if (map[move] === char) count++;
  })
  return count;
}

const Rules = {};
Rules[floor] = (idx) => floor;
Rules[st_ety] = (idx, m) => (countSurrounding(idx, m, st_fl) == 0 ? st_fl : st_ety);
Rules[st_fl] = (idx, m) => (countSurrounding(idx, m, st_fl) > 3 ? st_ety : st_fl);


// len 8554; 91x94;
function cycle(map, new_map) {

  let occupied = 0;
  let count = 0;

  for (let i = 0; i < map.length; i++) {
    new_map[i] = Rules[map[i]](i, map);
    if (new_map[i] !== map[i]) count++;
    if (new_map[i] === st_fl) occupied++;

  }

  console.log('Seats: ' + occupied);

  if (count > 0) return cycle(new_map, map);
  else return occupied;
}

let map = file.split('');
let new_map = file.split('');
cycle(map, new_map);
