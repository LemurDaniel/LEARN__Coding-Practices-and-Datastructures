// Load input
const fs = require('fs');

const file = fs.readFileSync('./input/day01-input.txt', 'utf-8');
let arr = [];
file.split('\r\n').forEach(num => arr.push(parseInt(num)));

const input = {
  array: arr,
  target: 2020
}


// Start_Solving

// Space Complexity: (n)
// Time  Complexity: (n)
function search_with_dict(arr, target, exclude) {
  
  let dict = {};
  
  for(let i=0; i<arr.length; i++){
      if(exclude && i === exclude) continue;
    
      if(dict[arr[i]]) return dict[arr[i]];
      const diff = target - arr[i];
      dict[diff] = arr[i] * diff;
  }
  return null;
}


function search_linear_3sum(arr, target) {
  
  for(let i=0; i<arr.length; i++){      

      let res = search_with_dict(arr, target, i);
      if(res !== null) return res * arr[i];

  }
}


//Part2
console.log('The Product is: '+  search_linear_3sum(input.array, input.target) );
