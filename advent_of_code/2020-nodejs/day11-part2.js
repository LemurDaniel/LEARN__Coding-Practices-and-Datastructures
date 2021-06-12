const fs = require('fs');

const file = fs.readFileSync('./input/day11-input.txt', 'utf-8').split('\r\n').join('');

// Start Solving

const row_len = 91; // The length of a line left to right
const col_len = 94; // The length of a column top to bottom

//const row_len = 10;
//const col_len = 10;
//const file = 'L.LL.LL.LLLLLLLLL.LLL.L.L..L..LLLL.LL.LLL.LL.LL.LLL.LLLLL.LL..L.L.....LLLLLLLLLLL.LLLLLL.LL.LLLLL.LL';
//const file = '.##.##.#.#.#.###...##...L...##...###.#.#.#.##.##.';

const st_ety = 'L';
const st_fl = '#';
const floor = '.';


function print_map(map){
  
  const depth = map.length / row_len;
  
  for(let i=0; i<depth; i++){
    //if i=0 then process pos with y=0;
    //the next one in array ==> pos[i] ==> (x=?, y=i); only x needed 
    
    const pos = i*row_len;

    console.log(map.join('').substring(pos, pos+row_len));
  }
}

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


function countSurrounding(indx, map, char){
  
  // +row_len and -1 compensates for indx=0
  let row = Math.floor( (indx+row_len) / row_len) - 1;
  let col = indx % row_len;
  let moves = [];
  
  // col+row to absolute pos in array
  let clc_abs = (row, col) => {
    if (row < 0 || row >= col_len) return -1;
    if (col < 0 || col >= row_len) return -1;
    return (row)*row_len + col;
  };
  
  let count = 0 // counting appearances of char
  // generates pos for moves
  move_deltas.forEach(delta => {
    // Move along axis by multiplying the deltas 
    let mult = 1; 
    do {
      const pos = clc_abs(row+ (delta[0]*mult), col+ (delta[1]*mult));
      if(pos === -1 || pos < 0 || pos >= map.length) return;
      else if(map[pos] === char) break;
      else if(map[pos] !== floor) return;

      mult++;
    }while(true);
    count++;
  });
  
  return count;
}

const Rules = {};
Rules[floor] = (idx) => floor;
Rules[st_ety] =  (idx, m) => (countSurrounding(idx, m, st_fl) == 0 ? st_fl:st_ety);
Rules[st_fl] = (idx, m) => (countSurrounding(idx, m, st_fl) > 4 ? st_ety:st_fl);
//Rules[st_ety] =  (idx, m) => countSurrounding(idx, m, st_fl);
//Rules[st_fl] = (idx, m) => countSurrounding(idx, m, st_fl);

// len 8554; 91x94;
function cycle(map, new_map){

  let occupied = 0;
  let count = 0;
  
  for(let i=0; i<map.length; i++){
     new_map[i] = Rules[map[i]](i, map);
    if(new_map[i] !== map[i]) count++;
    if(new_map[i] === st_fl) occupied++;
    
  }
  
  console.log('Seats: ' + occupied);
 
  if (count > 0) return cycle(new_map, map);
  else return occupied;
}

let map = file.split('');
let new_map = file.split('');
cycle(map, new_map);
print_map(new_map)
