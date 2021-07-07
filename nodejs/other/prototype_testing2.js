

function Something(name) {
    this.name = name
}

// this doesn't get bound in anonymous functions and defaults to Object.prototype. (In Browser it defaults to global object Window)
Something.prototype.hello = () => this.constructor;

const something = new Something('Something');
const anything = new Something('Anything');
const nothing = new Something('Nothing');

console.log(something.hello());
console.log(anything.hello());
console.log(nothing.hello());

console.log('------------------------------------')

// Doesn't work with call either.
Something.prototype.hello = () => 'Hello ' + this.name;

console.log(something.hello.call(something));
console.log(anything.hello.call(anything));
console.log(nothing.hello.call(nothing));

console.log('------------------------------------')

// this is bound to the instance calling the prototype function.
Something.prototype.hello = function () { return 'Hello ' + this.name; }

console.log(something.hello());
console.log(anything.hello());
console.log(nothing.hello());

console.log('------------------------------------')

// this can be changed by using call.
console.log(something.hello.call(nothing)); // is like nothing.hello();
console.log(anything.hello.call(something));
console.log(nothing.hello.call(anything));

console.log('------------------------------------')

// this of function can be bound via bind.
Something.prototype.hello = function () { return 'Hello ' + this.name; }.bind(something);

console.log(something.hello());
console.log(anything.hello());
console.log(nothing.hello());

console.log('------------------------------------')

// function can access its arguments as an array object on call.
Something.prototype.hello = function hello() { return hello.arguments };

console.log(something.hello(1));
console.log(anything.hello(2));
console.log(nothing.hello(3));


console.log('------------------------------------')

Something.prototype.hello = () => 'The prototype function';
anything.hello = () => 'Instance function gets called on anything. The others use the prototype function.'

console.log(something.hello());
console.log(anything.hello());
console.log(nothing.hello());