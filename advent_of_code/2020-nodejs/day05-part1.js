const fs = require('fs');

const file = fs.readFileSync('./input/day05-input.txt', 'utf-8').split('\r\n');


// Start Solving

function process_chars(id, ch){
  let min = 0;
  let max = 2 ** id.length -1;
  
  let curr;
  for(let i=0; i<id.length; i++){
    curr = (min + max) / 2;
    if(id[i] === ch) min = Math.ceil(curr);
    else max = Math.floor(curr);
  }
  return min;
}

function find_seat(id){
  let row = process_chars(id.substring(0,7), 'B');
  let column = process_chars(id.substring(7), 'R');
  return row*8 +column;
}


let max = 0;
file.forEach(seat => {
  let id = find_seat(seat);
  if(id > max) max = id;
})

console.log("The biggest Seat number is: "+max)