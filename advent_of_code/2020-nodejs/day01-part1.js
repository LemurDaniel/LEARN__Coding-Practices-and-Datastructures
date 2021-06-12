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


// Space Complexity: (1)
// Time  Complexity: (n!)
function search_linear(arr, target) {

  for(let i=0; i<arr.length; i++){
    for(let i2=i+1; i2<arr.length; i2++){

        if( (arr[i] + arr[i2]) === target){
          return arr[i] * arr[i2];
        }
    }
  }
}

// Space Complexity: (n)
// Time  Complexity: (n)
function search_with_dict(arr, target) {

  let dict = {};
  
  for(let i=0; i<arr.length; i++){
    
      if(dict[arr[i]]) return dict[arr[i]];
      const diff = target - arr[i];
      dict[diff] = arr[i] * diff;
  }
  return null;
}


console.log('The Product is: '+ search_linear(input.array, input.target) );
console.log('The Product is: '+ search_with_dict(input.array, input.target) );
  
