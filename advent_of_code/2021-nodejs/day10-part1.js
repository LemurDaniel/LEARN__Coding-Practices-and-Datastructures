const fs = require('fs');

// const input = fs.readFileSync('input/day10-input-test.txt', 'utf-8').split('\r\n');
const input = fs.readFileSync('input/day10-input.txt', 'utf-8').split('\r\n');


const LOOKUP_TABLE = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

var syntaxErrorScore = 0;


function validateParentheses(line, brackets = '(),[],{},<>'){

  const dict = {};
  const stack = [];
  brackets.split(',').forEach( v => dict[v[0]] = v[1]);

  for(const char of line) {

    if(char in dict)
      stack.push(char);
    else if( char !== dict[stack.pop()])
      return char;
  }

  return true;
}

for(const line of input) {
  const result = validateParentheses(line);
  if(result !== true)
    syntaxErrorScore += LOOKUP_TABLE[result];
}

console.log('Total synstax error score: ' + syntaxErrorScore);