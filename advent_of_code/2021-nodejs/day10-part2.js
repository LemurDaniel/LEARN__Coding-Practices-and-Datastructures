const fs = require('fs');

// const input = fs.readFileSync('input/day10-input-test.txt', 'utf-8').split('\r\n');
const input = fs.readFileSync('input/day10-input.txt', 'utf-8').split('\r\n');


const LOOKUP_TABLE = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const scores = [];


function validateParentheses(line, brackets = '(),[],{},<>') {

  const dict = {};
  const stack = [];
  brackets.split(',').forEach(v => dict[v[0]] = v[1]);

  for (const char of line) {

    if (char in dict)
      stack.push(char);
    else if (char !== dict[stack.pop()])
      return false;
  }

  let totalScore = 0;
  while (stack.length > 0) {
    const char = stack.pop();
    const missing = dict[char];
    totalScore = totalScore * 5 + LOOKUP_TABLE[missing];
  }
  scores.push(totalScore);

  return true;
}

for (const line of input) {
  const result = validateParentheses(line);
}

scores.sort((a, b) => a - b)
console.log('Middle score: ' + scores[(scores.length - 1) / 2]);