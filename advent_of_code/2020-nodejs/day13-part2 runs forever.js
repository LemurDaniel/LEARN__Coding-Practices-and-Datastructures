const fs = require('fs');

const file = fs.readFileSync('./input/day13-input.txt', 'utf-8').split('\r\n');

const timestamp = parseInt(file[0]);
const bus_ids = file[1].split(',');

//timestamp = 939;
//bus_ids = '1789,37,47,1889'.split(',');


// Start Solving

function solve_eq(z, z1, z2, x, y) {
  // 1 = (31 * x) - (19 * y); Bruteforce takes long!!!! // Needs optimizations ??? or throw out the whole solution
  //console.log( z + ' ' + z1 + ' ' + z2 + ' ' + x + ' ' + y)
  while (true) {
    //console.log( z + ' ' + z1 + ' ' + z2 + ' ' + x + ' ' + y)
    let t2 = z2 * y;
    let t1 = z1 * x;
    if (t2 - t1 === z) return [x, y];
    if (t2 > t1) x++;
    else y++;
  }
}

let debug_count = 0;
let multipliers = [];

function bla(indx, y) {

  let indx_now = indx - 1;
  while (bus_ids[indx_now] === 'x') indx_now--;
  let x = 1; //z1
  let res;
  while (true) {
    res = solve_eq(indx - indx_now, bus_ids[indx_now], bus_ids[indx], x, y);
    if (res[1] > y && indx !== bus_ids.length - 1) return [false, res[1]];
    y = res[1];

    //console.log(indx_now)
    if (indx_now - 1 < 0) break;

    let rec = bla(indx_now, res[0]);

    if (debug_count++ % 100 === 0) {
      console.log(debug_count + 'indx: ' + indx_now + '  ' + bus_ids[indx_now]);
      console.log(rec);
    };

    if (rec[0] === false) x = rec[1];
    else break;
  }
  //console.log(res)
  multipliers.push(res[0]);
  if (indx === bus_ids.length - 1) multipliers.push(res[1]);
  return [true, 1];
}

bla(bus_ids.length - 1, 1)
let sums = [];
let indx = 0;
for (let indx = 0, indx2 = 0; indx < bus_ids.length; indx++) {
  if (bus_ids[indx] === 'x') sums.push(sums[indx - 1] + 1);
  else sums.push(bus_ids[indx] * multipliers[indx2++]);
}

console.log(multipliers)
console.log(sums)

let ts = file[1].split(',');

for (let i = bus_ids.length; i >= 0; i--) {


}


//console.log('The Solution is: '+min_id*min+ ' with ' + min + ' Minutes waiting time on Bus: ' + min_id);
