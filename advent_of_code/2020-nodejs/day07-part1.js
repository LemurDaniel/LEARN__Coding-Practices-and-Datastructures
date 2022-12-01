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

function iterate(container_bag, bag_searched, hash) {

  file.forEach(rule_set => {
    const rule_arr = rule_set.split(', ');
    const first_rule = rule_arr[0].split(' ');

    const bag = first_rule[0] + '_' + first_rule[1];
    const first_bag = first_rule[5] + '_' + first_rule[6];

    if (first_rule[4] === 'no') return;
    else if (first_bag === bag_searched) {
      if (hash[bag]) return;
      container_bag.push(bag);
      hash[bag] = 1;
    }

    for (let i = 1; i < rule_arr.length; i++) {
      const rule = rule_arr[i].split(' ');
      if ((rule[1] + '_' + rule[2]) !== bag_searched) continue;
      if (!hash[bag]) {
        container_bag.push(bag);
        hash[bag] = 1;
      }
      return;
    }
  });
}

var gold_bag = ['shiny_gold']
var gold_bag_hash = { gold_bag: 1 };

for (let i = 0; i < gold_bag.length; i++) {
  iterate(gold_bag, gold_bag[i], gold_bag_hash);
}
console.log('BAGS WHO CAN CONTAIN GOLDEN BAG: ' + (gold_bag.length - 1));