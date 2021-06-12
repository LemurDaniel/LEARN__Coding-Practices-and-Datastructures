const fs = require('fs');

const file = fs.readFileSync('./input/day08-input.txt', 'utf-8').split('\r\n');

// Start Solving

var prg_counter = 0;
var accumulator = 0;
const instruction_set = {
  nop: a => null,
  acc: a => accumulator += a,
  jmp: a => prg_counter += a - 1 //compensate for the ++ in for loop;
}

let dict = {}


for(; prg_counter <= file.length; prg_counter++){

  if(dict[prg_counter]) break;
  dict[prg_counter] = file[prg_counter];
  
  const instr = file[prg_counter].split(' '); 

  instruction_set[instr[0]](parseInt(instr[1]));
}

//console.log(dict)
console.log("Akkumulator: "+accumulator);

  
