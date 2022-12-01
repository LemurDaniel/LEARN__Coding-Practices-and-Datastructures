const fs = require('fs');

const file = fs.readFileSync('./input/day18-input.txt', 'utf-8').split('\r\n');

//const file = ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'];

const Stack = function () {
  this.node = function (data, prev) {
    this.data = data;
    this.prev = prev;
  }

  this.top;

  this.empty = () => this.top == null
  this.push = (data) => this.top = new this.node(data, this.top);
  this.peek = () => this.top.data;
  this.pop = () => {
    const data = this.top.data;
    this.top = this.top.prev;
    return data;
  }
}

// Start Solving

//Convert infix to RPN

const operators = {
  '+': { pre: 1, func: (a, b) => a + b }, // operator: precedence
  //'-': { pre: 0, func: (a, b) => a - b },
  '*': { pre: 0, func: (a, b) => a * b }
  //'/': { pre: 0, func: (a, b) => a / b }
}


// shunting yard algo
function solve_exp(exp) {

  const outp = new Stack();
  const ops = new Stack();
  let operate = () => {
    const strs = outp.top.prev.data + ' ' + ops.peek() + ' ' + outp.peek();
    outp.push(operators[ops.pop()].func(outp.pop(), outp.pop()));
    //console.log(strs + ' = ' + outp.peek());
  };

  exp = exp.split(' ').join('').split('');
  exp.forEach(arg => {
    if (arg.match('[0-9]')) outp.push(parseInt(arg));
    else if (arg == '(') ops.push(arg);
    else if (arg == ')') {
      while (ops.peek() != '(') operate();
      ops.pop();
    }
    else if (arg in operators) {
      while (!ops.empty()) {
        const ops_top = ops.peek();
        if (!(ops_top in operators) || operators[arg].pre > operators[ops_top].pre) break;
        operate();
      }
      ops.push(arg);
    }
    //console.log(outp.join(','));
    //console.log(ops);
  });
  while (!ops.empty()) operate();

  return outp.top.data;
}

let sum = 0;
file.forEach(exp => sum += solve_exp(exp));
console.log('The total sum of all Expressions is: ' + sum);




/*
// shunting yard algo
function to_rpn(exp){
  const outp = [];
  const ops = new Stack();
  exp = exp.split(' ').join('').split('');
  console.log(exp)
  exp.forEach(arg => {
    if(arg.match('[0-9]')) outp.push(parseInt(arg));
    else if(arg == '(') ops.push(arg);
    else if(arg == ')') {
      while(ops.peek() != '(') outp.push(ops.pop());
      ops.pop();
    }
    else if(arg in operators) {
      while(!ops.empty()) {
        const ops_top = ops.peek();
        if(!(ops_top in operators) || operators[arg].pre > operators[ops_top].pre) break;
        outp.push(ops.pop());
      }
      ops.push(arg);
    }
    console.log(outp.join(','));
    console.log(ops);
  });
  while(!ops.empty()) outp.push(ops.pop());

  console.log(outp.join(' '));
}*/
