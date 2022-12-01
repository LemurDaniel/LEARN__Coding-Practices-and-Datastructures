const fs = require('fs');

const file = fs.readFileSync('./input/day14-input-modified.txt', 'utf-8').split('\r\n');

/*
let test = fs.readFileSync('./input/day14-input.txt', 'utf-8').split('\r\n');
for(let i=0; i<test.length; i++){
  let el = test[i].split(' ');
  if(el[0] === 'mask') el[2] = '"'+el[2]+'"';
  else el[2] = 'b_mask('+el[2]+')';
  test[i] = el.join(' ');
}
test = test.join('\r\n');
fs.writeFileSync('./input/day14-input-modified.txt', test, 'utf-8');
*/

//let file = 'mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",mem[8] = b_mask(11),mem[7] = b_mask(101),mem[8] = b_mask(0)'.split(',');

// Start Solving
let mask = '';
let mem = {};

function b_mask(num) {
  new_int = mask.split('X').join('0').split('');
  base2 = (num).toString(2);

  for (let i = 0; i < base2.length; i++) {
    const mask_bit = mask[mask.length - 1 - i];
    if (mask_bit !== 'X') continue;
    new_int[mask.length - 1 - i] = base2[base2.length - 1 - i];
  }

  return parseInt(new_int.join(''), 2);
}

file.forEach(instr => eval(instr));

let sum = 0;
Object.keys(mem).forEach(k => sum += mem[k]);

console.log('The sum of all memory adresses is: ' + sum)