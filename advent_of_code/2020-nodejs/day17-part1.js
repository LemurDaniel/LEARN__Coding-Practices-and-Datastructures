const fs = require('fs');

/*

const inital_width = 3;
const initial_states = '.#...####';  // pos 0,0,0 == 
const initial_states_start = [-1, -1, 0];
*/

const initial_states = fs.readFileSync('./input/day17-input.txt', 'utf-8').split('\r\n').join('');
const inital_width = 8;
const initial_states_start = [-3, -3, 0];
const igr = 9;  //initial_grid_size
// the full size of the pocket dimension
// doesn't increase
// higher values means more compute time needed
// lower values means potentially missed cubes with increasing cycles
// 9 is enough for input and 6 cycles

// coordinates are  ['x,y,z'] encode as string in grid
// probably easier than some 3D-Array
var inactive_grid = {};
var active_grid = {};
const active_ind = '#';
const inactive_ind = '.';

const rule_set = {};
rule_set[active_ind] = (coord) => check_neighbours(coord, [2, 3]) ? active_ind : inactive_ind;
rule_set[inactive_ind] = (coord) => check_neighbours(coord, [3, 3]) ? active_ind : inactive_ind;


/// put from all inactive cubes from 0,0,-2 to 6,6,2 into grid
const initial_end = [igr, igr, igr];
const initial_start = [-igr, -igr, -igr];
let start = initial_start.join(',').split(',');
start[0]--;
const comp_arr = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) return false;
  }
  return true;
}

while (!comp_arr(start, initial_end)) {

  start[0]++;
  if (start[0] == (initial_end[0] + 1)) {
    for (let i = 0; i < start.length - 1; i++) {
      if (start[i] <= initial_end[i]) break;
      start[i + 1]++;
      start[i] = initial_start[i];
    }
  }

  active_grid[start] = inactive_ind;
}


/// put initial state in grid
for (let i = 0; i < initial_states.length; i++) {
  const coord = [i % inital_width, Math.floor(i / inital_width), initial_states_start[2]];
  vector_add(coord, initial_states_start); //  offset by initial start
  active_grid[coord] = initial_states[i];
}
//console.log(active_grid);


//Generate Deltas 
const deltas = [];
const end = [1, 1, 1]
start = [-2, -1, -1];

while (!comp_arr(start, end)) {

  start[0]++;
  if (start[0] == 2) {
    for (let i = 0; i < start.length - 1; i++) {
      if (start[i] < 2) break;
      start[i + 1]++;
      start[i] = -1;
    }
  }
  //console.log(start);

  const copy = start.join(',');
  if (copy == '0,0,0') continue;
  deltas.push(copy.split(','));
}
////////////////////////

function vector_add(v1, v2) {
  v1[0] = parseInt(v1[0]) + parseInt(v2[0]);
  v1[1] = parseInt(v1[1]) + parseInt(v2[1]);
  v1[2] = parseInt(v1[2]) + parseInt(v2[2]);
  return v1;
}


/// Check neigbours
function check_neighbours(coord, range) {

  let count_active = 0;
  deltas.forEach(delta => {
    const copy = coord.join(',').split(',');
    const pos = vector_add(copy, delta).toString();

    //not active
    if (!(pos in active_grid)) return;
    else if (active_grid[pos] == inactive_ind) return;
    else count_active++;
  })

  //console.log(count_active);
  return (count_active >= range[0] && count_active <= range[1]);
}
//check_neighbours([2,2,0], [2,3])

function to_num_arr(arr) {
  const coord = arr.split(',');
  coord[0] = parseInt(coord[0]);
  coord[1] = parseInt(coord[1]);
  coord[2] = parseInt(coord[2]);
  return coord;
}

function cycle() {
  let ccccccc = 1;
  const keys = Object.keys(active_grid);
  keys.forEach(k => {
    const coord = to_num_arr(k);
    //  console.log(active_grid[k])
    //  console.log(coord)
    inactive_grid[coord] = rule_set[active_grid[k]](coord);
    if (ccccccc++ % 10000 == 0) {
      const percent = ((ccccccc / keys.length) * 100).toString().substring(0, 5);
      console.log('Progress: ' + percent + '%');
    }
  })
  const temp = inactive_grid;
  inactive_grid = active_grid;
  active_grid = temp;
}



//Count active
function count_active_in_grid() {
  let count = 0;
  const values = Object.values(active_grid);
  values.forEach(v => count += (v == active_ind ? 1 : 0));
  return count;
}

// traverse on z axis ?
let cycles = 6;
for (let i = 0; i < cycles; i++) {
  cycle();
  console.log('Finished cycle: ' + (i + 1));
}

//console.log(active_grid);

console.log('There are ' + count_active_in_grid() + ' active cubes in the pocket dimenstion after ' + cycles + ' cycles')