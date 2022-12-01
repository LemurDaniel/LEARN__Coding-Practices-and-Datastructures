const fs = require('fs');

const file = fs.readFileSync('./input/day06-input.txt', 'utf-8').split('\n\n');

let groups = [];

file.forEach(el => groups.push(el.split('\n').join(' ')));

// Start Solving

function count_yes_everyone(group) {
  let dict = {};
  let arr = [];
  let forms = group.split(' ');
  forms.forEach(form => {
    form.split('').forEach(question => {
      if (!dict[question]) dict[question] = 1;
      else dict[question] += 1;
      if (dict[question] === forms.length) arr.push(dict[question]);
    })
  });
  return arr.length;
}
let sum = 0;
groups.forEach(group => sum += count_yes_everyone(group));
console.log("SUM EVERYONE ANSWERED YES: " + sum);