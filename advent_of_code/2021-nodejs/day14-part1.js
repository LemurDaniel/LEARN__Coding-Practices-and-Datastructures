const fs = require('fs');

// const input = fs.readFileSync('input/day14-input-test.txt', 'utf-8').split('\n\r\n');
const input = fs.readFileSync('input/day14-input.txt', 'utf-8').split('\n\r\n');

const INSERTION_RULES = {}
const POLYMER_TEMPLATE = input[0].trim();

for (const [key, value] of input[1].split('\r\n').map(rule => rule.split(' -> ')))
  INSERTION_RULES[key] = value;


class Node {

  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }

  add(element) {
    const next = new Node(element);
    next.next = this.next;
    this.next = next;
  }

  print() {
    let str = '';
    let node = this;
    while (node != null) {
      str += node.element + '-';
      node = node.next;
    }

    if (str.length > 180)
      return str.substring(0, 80) + '/.../-' + str.substring(str.length - 80, str.length - 1);
    else
      return str.substring(0, str.length - 1)
  }

}



const POLYMER = new Node(POLYMER_TEMPLATE[0]);
for (let i = 1, node = POLYMER; i < POLYMER_TEMPLATE.length; i++) {
  node.add(POLYMER_TEMPLATE[i]);
  node = node.next;
}



function processStep() {
  let node = POLYMER;
  let next = node.next;

  while (next != null) {
    const group = node.element + next.element;
    if (group in INSERTION_RULES) {
      node.add(INSERTION_RULES[group]);
    };

    node = next;
    next = next.next;
  }
}



console.log('\n   Template: ' + POLYMER.print());
for (let step = 0; step < 10; step++) {
  processStep()
  console.log('   After Step ' + (step + 1) + ': ' + POLYMER.print());
}
console.log();



let commonElements = {};
let node = POLYMER;
while (node !== null) {
  if (node.element in commonElements)
    commonElements[node.element]++;
  else
    commonElements[node.element] = 1;
  node = node.next;
}

console.log(commonElements)
let sorted = Object.values(commonElements).sort((a, b) => b - a)
console.log('\n   Difference between highest and lowest atom count: ' + (sorted[0] - sorted.pop()) + '\n')
