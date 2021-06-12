const fs = require('fs');

const file = fs.readFileSync('./input/day14-input.txt', 'utf-8').split('\r\n');

//let file = 'mask = 000000000000000000000000000000X1001X,mem[8] = 11,mem[7] = 101,mem[8] = 0'.split(',');

// Start Solving
let mask = '000000000000000000000000000000X1001X';
let mem = {};

function b_mask(addr){

  let addresses = [ (mask).split('') ];
  addr = (addr).toString(2).split('');

  for(let i=mask.length-1; i>=0; i--){
    if(mask[i] == '0') {
      let bit = '0';
      if(i >= mask.length - addr.length ) bit = addr[i- (mask.length - addr.length)];
      for(let i2=0; i2<addresses.length; i2++){
        addresses[i2][i] = bit;
      }
    }else if(mask[i] == 'X') {
      let len = addresses.length;
      for(let i2=0; i2<len; i2++){
        addresses[i2][i] = '0';
        addresses.push(addresses[i2].join('').split('')); // make copy of array
        addresses[i2][i] = '1';
      }
    } else {
      for(let i2=0; i2<addresses.length; i2++){
        addresses[i2][i] = '1';
      }
    }
  }

  //addresses.forEach(ad => console.log(ad.join('')));
  return addresses;
}

file.forEach(i => {
  console.log(i)
  instr = i.split(' ');

  if(instr[0] == 'mask') mask = instr[2];
  else {
    let addr = instr[0].replace(']','').split('[')[1];
    b_mask(parseInt(addr)).forEach(add => mem[add.join('')] = parseInt(instr[2]) );
  }
});
//console.log(mem);

let sum = 0;
Object.keys(mem).forEach( k => sum += mem[k]);

console.log('The sum of all memory adresses is: '+ sum)