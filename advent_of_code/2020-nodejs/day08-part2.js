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
let arr = [];

//622 instructions
function process(replace) {

  for(; prg_counter < file.length; prg_counter++){

    if(dict[prg_counter]) return false
    dict[prg_counter] = file[prg_counter];

    let instr = file[prg_counter].split(' ');
    if(replace && prg_counter in replace)
      instr = replace[prg_counter].split(' ');
    

    if(!replace && instr[0] !== 'acc'){
      let obj = {};
      obj[prg_counter] = ((instr[0] === 'nop' ? 'jmp ':'nop ')+instr[1]);
      arr.push(obj);
    } 
    
    instruction_set[instr[0]](parseInt(instr[1]));
  }
}

// Generate Array
process();

for(let i=arr.length-1; i>=0; i--){

  dict = {};
  accumulator = 0;
  prg_counter = 0;
  process(arr[i]);

  if(prg_counter >= 622) 
    console.log('Programm Counter: '+prg_counter + '\nAccumulator: ' + accumulator);
}



