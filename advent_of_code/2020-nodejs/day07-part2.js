const fs = require('fs');

const file = fs.readFileSync('./input/day07-input.txt', 'utf-8').split('.\r\n');

// Start Solving

/*
const BAGS = {
  red:     { white: 1, yellow: 2 },
  orange:  { white: 3, yellow: 4 },
  white:   { gold: 1 },
  yellow:  { gold: 2, blue: 9 },
  gold:    { olive: 1, plum: 2 },
  olive:   { blue: 3, black: 4 },
  plum:    { blue: 5, black: 6 },
  blue:    {},
  black:   {}
}

*/
var bags = {};

file.forEach( rule_set => {
  const rule_arr = rule_set.split(', ');
  const first_rule = rule_arr[0].split(' ');
  
  const bag = first_rule[0]+'_'+first_rule[1];
  const first_bag = first_rule[5]+'_'+first_rule[6];

  bags[bag] = {};
  if(first_rule[4] === 'no') return;
     
  bags[bag][first_bag] = parseInt(first_rule[4]);
  
  for(let i=1; i<rule_arr.length; i++){
    const rule = rule_arr[i].split(' ');
    bags[bag][rule[1]+'_'+rule[2]] = parseInt(rule[0]);
  }
})

function recurse(obj) {
  let keys = Object.keys(obj);
  let sum = 0;

  for(let i=0; i<keys.length; i++){
    const k = keys[i];
    sum += (obj[k] * recurse(bags[k]))+obj[k];
  }
  return sum;
}

console.log("a shiny golden bag can contain this many bags: "+recurse(bags['shiny_gold']));
