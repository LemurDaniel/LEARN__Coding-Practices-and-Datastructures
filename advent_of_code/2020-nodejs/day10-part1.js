const fs = require('fs');

const file = fs.readFileSync('./input/day10-input.txt', 'utf-8').split('\r\n');

// Start Solving

let obj = {};

file.forEach(el => {
  const num = parseInt(el);
  if(num in obj) obj[num] += 1;
  else obj[num] = 1; 
})

let keys = Object.keys(obj);
let array = [0];
let max = 0;
keys.forEach(k => {
  const num = parseInt(k);
  for(let i=0; i < obj[k]; i++){
    array.push(num);
  }
  if(num > max) max = num;
})
array.push(max+3);


let distributions = {}

for(let i=1; i<array.length; i++){
  const diff = array[i] - array[i-1];
  if(diff in distributions) distributions[diff]++;
  else distributions[diff] = 1;
}

console.log(distributions);

console.log('The Product is: ' + distributions[1] * distributions[3]);
