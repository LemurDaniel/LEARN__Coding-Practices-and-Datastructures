const fs = require('fs');

const file = fs.readFileSync('./input/day13-input.txt', 'utf-8').split('\r\n');

const timestamp = parseInt(file[0]);
const bus_ids = file[1].split(',');

//timestamp = 939;
//bus_ids = '7,13,x,x,59,x,31,19'.split(',');


// Start Solving

function get_min_to_next_departure(timestamp, bus_id) {
  return Math.ceil(timestamp / bus_id) * bus_id - timestamp
}


let min = timestamp;
let min_id = 0;
bus_ids.forEach(id => {
  if (id === 'x') return;
  let diff = get_min_to_next_departure(timestamp, parseInt(id));
  if (diff > min) return;
  min = diff;
  min_id = id;
});

console.log('The Solution is: ' + min_id * min + ' with ' + min + ' Minutes waiting time on Bus: ' + min_id);
