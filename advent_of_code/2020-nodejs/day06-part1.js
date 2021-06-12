const fs = require('fs');

const file = fs.readFileSync('./input/day06-input.txt', 'utf-8').split('\n\n');

let groups = [];

file.forEach( el => groups.push(el.split('\n').join(' ')) );

// Start Solving

function count_yes_anyone(group) {
  let dict = {};
  group.split(' ').forEach(form => {
    form.split('').forEach(question => {
      dict[question] = 0;
    })
  });

  return Object.keys(dict).length;
}

let sum = 0;
groups.forEach(group => sum += count_yes_anyone(group));
console.log("SUM ANYONE ANSWERED YES: "+sum);