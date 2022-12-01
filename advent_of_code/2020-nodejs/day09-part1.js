const fs = require('fs');

const file = fs.readFileSync('./input/day09-input.txt', 'utf-8').split('\r\n');

// Start Solving

// Datastructure which wraps around an array length 25 and overrides previous values if 25 is exceeded
var list_25 = function (preamble) {
  this.preamble = preamble;
  this.array = [];
  this.p_a = 0;
  this.p_e = preamble - 1; // points to end

  this.insert = function (data) {
    data = parseInt(data);
    this.p_e = (this.p_e + 1) % this.preamble;
    this.p_a = (this.p_a + 1) % this.preamble;
    this.array[this.p_e] = data;
  }

  this.get = function (index) {
    idx = (this.p_a + index) % this.preamble;
    return this.array[idx];
  }

  this.print = function () {
    console.log('[');
    for (let i = 0; i < this.preamble; i++) {
      if (i === this.p_a) console.log(this.array[i] + '<0')
      else if (i === this.p_e) console.log(this.array[i] + '<' + (this.preamble - 1));
      else console.log(this.array[i]);
    }
    console.log(']\n');
  }

  this.sum_in = function (sum) {
    let dict = {};
    let arr = this.array
    for (let i = 0; i < arr.length; i++) {
      const diff = sum - arr[i];
      if (diff === sum / 2) continue; //no same numbers, sum must be of different nums
      if (dict[arr[i]]) return true;
      else dict[diff] = 1;
    }
    return false;
  }
}


// Actual Start
let list = new list_25(25);

//Insert Preamble
for (let i = 0; i < 25; i++)  list.insert(file[i])
//list.print();

let s = 0;
for (let i = 25; i < file.length; i++, s = i) {
  const curr = file[i];
  if (!list.sum_in(curr)) break;
  list.insert(curr);
}

console.log('Corrupted Number: ' + file[s])