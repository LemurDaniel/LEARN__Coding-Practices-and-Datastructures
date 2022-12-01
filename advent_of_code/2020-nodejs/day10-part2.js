const fs = require('fs');

const file = fs.readFileSync('./input/day10-input.txt', 'utf-8').split('\r\n');

// Start Solving

let obj = {};

file.forEach(el => {
  const num = parseInt(el);
  if (num in obj) obj[num] += 1;
  else obj[num] = 1;
})

let keys = Object.keys(obj);
let array = [0];
let max = 0;
keys.forEach(k => {
  const num = parseInt(k);
  for (let i = 0; i < obj[k]; i++) {
    array.push(num);
  }
  if (num > max) max = num;
})
array.push(max + 3);


console.log(array.join(','))
//////
const cache = {};

function permutate(prev_idx, curr_idx, depth) {

  const args = prev_idx + ',' + curr_idx;
  if (args in cache) return cache[args];

  let sum = 0;
  for (let i = curr_idx; i < array.length - 2; i++) {
    const diff = array[i + 1] - array[prev_idx];
    //console.log(array[i+1] +' - '+array[prev_idx]+' = '+diff)

    if (diff > 3) prev_idx = i;
    else {
      //console.log(array[prev_idx] + '  ' + array[i] + '  ' + array.length+'/'+i + ' Depth: ' + depth )
      const erg1 = permutate(i, i + 1, depth + 1);
      cache[i + ',' + (i + 1)] = erg1;
      sum += erg1;
      const erg2 = permutate(prev_idx, i + 1, depth + 1);
      cache[prev_idx + ',' + (i + 1)] = erg2;
      sum += erg2;
      //if(count % 10000000 === 0) console.log('Sum: '+sum + ' Depth: ' + depth)
      return sum;
    }
  }
  return 1;
}

let sum = permutate(0, 1, 1);
console.log('There are: ' + sum + ' possible permutations');