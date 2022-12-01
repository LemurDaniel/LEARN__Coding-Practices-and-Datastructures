const fs = require('fs');

const file = fs.readFileSync('./input/day03-input.txt', 'utf-8').split('\r\n').join('');

const indicator_train = 'O';
const indicator_tree = 'X';
const tree = '#';
const print_width = 3;

const input = {
  terrain: file,
  slope: [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ],
  width: 31
}

function print_terrain(terrain, width, repeats, pos_x) {

  const depth = terrain.length / width;
  let pos_x_counter = 0;

  for (let i = 0; i < depth; i++) {
    //if i=0 then process pos with y=0;
    //the next one in array ==> pos[i] ==> (x=?, y=i); only x needed 

    const pos = i * width;
    const str_base = terrain.substring(pos, pos + width);
    let str_final = str_base;

    for (let i2 = 0; i2 < repeats; i2++) str_final += str_base;

    // Replace X_Position with indicator of the train thing
    let curr = pos_x[pos_x_counter];

    if (curr && curr.y === i) {
      pos_x_counter++;
      str_final = str_final.split('');
      str_final[curr.x % str_final.length] = curr.ch;
      str_final = str_final.join('');
    }

    console.log(str_final);
  }
}


// Start Solving

function pass_terrain(terrain, slope, width, print_output) {

  let curr_xy = [0, 0];
  let depth = terrain.length / width;
  let entered_pos_x = [];
  let count_touched_trees = 0;

  while (curr_xy[1] < depth) {

    //X-Postion wrapping back when leaving bounds
    const x_pos = (curr_xy[0] % width);
    const y_pos = curr_xy[1];

    //Actual Position in string
    const pos = x_pos + y_pos * width;

    // Check if tree encountered
    if (terrain[pos] === tree) {
      count_touched_trees++;
      entered_pos_x.push({ x: curr_xy[0], y: curr_xy[1], ch: indicator_tree });
    } else {
      entered_pos_x.push({ x: curr_xy[0], y: curr_xy[1], ch: indicator_train });
    }

    // Add Slope Vector
    curr_xy[0] += slope[0];
    curr_xy[1] += slope[1];
  }

  if (print_output) print_terrain(input.terrain, input.width, print_width, entered_pos_x);
  console.log('Encountered Trees: ' + count_touched_trees);
  return count_touched_trees;
}

let res = [];
for (let i = 0; i < input.slope.length; i++) {
  res.push(pass_terrain(input.terrain, input.slope[i], input.width, false));
}

let multi = res[0];
let strr = res[0] + ' '
for (let i = 1; i < res.length; i++) {
  strr += '* ' + res[i] + ' ';
  multi *= res[i];
}
console.log(strr + ' = ' + multi);