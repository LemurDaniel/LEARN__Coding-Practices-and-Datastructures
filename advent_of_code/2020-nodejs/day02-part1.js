const fs = require('fs');

const file = fs.readFileSync('./input/day02-input.txt', 'utf-8').split('\r\n');

var input = [];

for(let i=0; i<file.length; i++){
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


function evaluate(inp){
  
  let min = inp.min;
  let max = inp.max;
  let pass = inp.pass;
  let ch = inp.ch;
  
  let count = 0;
  
  for(let i=0; i<pass.length; i++){
      if(pass[i] === ch) count++;
      if(count > max) return false;
  }
  
  if(count < min) return false;
  return true
  
}


let count_valid = 0;

for(let i=0; i<input.length; i++){
  if(evaluate(input[i])) count_valid++;
}


console.log("Valid Passwords: " + count_valid);