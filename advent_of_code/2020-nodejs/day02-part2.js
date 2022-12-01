const fs = require('fs');

const file = fs.readFileSync('./input/day02-input.txt', 'utf-8').split('\r\n');

var input = [];

for (let i = 0; i < file.length; i++) {
  let arr_temp = file[i].split(' ');
  let range = arr_temp[0].split('-');

  const policy = {
    min: parseInt(range[0]),
    max: parseInt(range[1]),
    ch: arr_temp[1][0],
    pass: arr_temp[2]
  }

  input.push(policy);
}


// Start Solving

function evaluate(inp) {

  let pos_1 = inp.min;
  let pos_2 = inp.max;
  let pass = inp.pass;
  let ch = inp.ch;

  let count = 0;

  return XOR(pass[pos_1 - 1] === ch, pass[pos_2 - 1] === ch);
}

function XOR(a, b) {
  return (a || b) && !(a && b);
}


let count_valid = 0;

for (let i = 0; i < input.length; i++) {
  if (evaluate(input[i])) count_valid++;
}

console.log("Valid Passwords: " + count_valid);