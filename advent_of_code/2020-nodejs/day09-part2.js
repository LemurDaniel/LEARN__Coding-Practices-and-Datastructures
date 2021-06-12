const fs = require('fs');

const file = fs.readFileSync('./input/day09-input.txt', 'utf-8').split('\r\n');

// Start Solving

// Datastructure which wraps around an array length 25 and overrides previous values if 25 is exceeded
var list_25 = function(preamble){
  this.preamble = preamble;
  this.array = [];
  this.p_a = 0;
  this.p_e = preamble-1; // points to end
  
  this.insert = function(data) {
    data = parseInt(data);
    this.p_e = (this.p_e+1) % this.preamble;
    this.p_a = (this.p_a+1) % this.preamble;
    this.array[this.p_e] = data;
  }
  
  this.get = function(index) {
    idx = (this.p_a + index) % this.preamble;
    return this.array[idx];
  }
  
  this.print = function(){
    console.log('[');
    for(let i=0; i<this.preamble; i++){
        if(i===this.p_a) console.log(this.array[i]+'<0')
        else if(i===this.p_e) console.log(this.array[i]+'<'+(this.preamble-1));
        else console.log(this.array[i]);
    }
     console.log(']\n');
  }
  
  this.sum_in = function(sum){
    let dict = {};
    let arr = this.array
    for(let i=0; i<arr.length; i++){
      const diff = sum - arr[i];
      if(diff === sum/2) continue; //no same numbers, sum must be of different nums
      if(dict[arr[i]]) return true;
      else dict[diff] = 1;
    }
    return false;
  }
}


//Part2
//RAW_INPUT = '35 20 15 25 47 40 62 55 65 95 102 117 150 182 127 219 299 277 309 576'.split(' ');
file[572] = '0';
let target = 138879426;
let p_a = 0;
let p_e = 0;
let sum = 0;

for(; p_e<file.length; p_e++){

  // add next number until target
  sum += parseInt(file[p_e]);
  if(sum === target) break;
  else if(sum < target) continue;
  
  // if too big subtract first number until target
  for(; sum > target; p_a++){
    sum -= parseInt(file[p_a]);
  }
  if(sum === target) break;
}

// find min and max value in that range
let min = parseInt(file[p_a]);
let max = parseInt(file[p_a]);

for(let i=p_a; i<=p_e; i++){
  const curr =  parseInt(file[i]);
  if(curr > max) max = curr;
  else if(curr < min) min = curr;
}

console.log(sum + ' is in range ('+p_a+' - '+p_e+')');
console.log(min + ' + ' + max + ' ==> ' + (min+max));