const Helper = require("../Helper");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let [a, b, ...rest] = arr;
console.log('First  value of array (1): ' + a);
console.log('Second value of array (2): ' + b)
console.log('Array containing all the rest: ' + rest)

console.log()
console.log('------------------------')
console.log('Destructuring with default and ignored values')
console.log()


let [a2, , b2, c2 ='default value for when undefined', ...rest2 ] = arr;
console.log('First  value of array   (1): ' + a2);
console.log('This   value is ignored (2)');
console.log('third  value of array   (3): ' + b2)
console.log('fourth value of array   (4): ' + c2)
console.log('Array containing all the rest : ' + rest)



console.log()
console.log('------------------------')
console.log('Destructuring an array as a function parameter')
console.log()

function arrayDestructuring([a, , b, c ='default value for when undefined', ...rest ]) {
    console.log('First  value of array   (1): ' + a2);
    console.log('This   value is ignored (2)');
    console.log('third  value of array   (3): ' + b2)
    console.log('fourth value of array   (4): ' + c2)
    console.log('Array containing all the rest : ' + rest)
}
arrayDestructuring(arr)



console.log()
console.log('------------------------')
console.log('Spreading an array into another array')
console.log()

const arr2 = [10, 11, 12, 13]

console.log('Not spreaded: ' + Helper.print_Array([arr, arr2]))
console.log('Spreaded: ' + Helper.print_Array([...arr, ...arr2]))





const obj = {
    key1: 1,
    key2: 2,
    key3: 3,
    key4: 4
}


console.log()
console.log('------------------------')
console.log('Destructuring an object')
console.log()

const { key1, key4, key5 = 'default' } = obj;
console.log('Key1 contains value (1): ' + key1)
console.log('Key4 contains value (4): ' + key4)
console.log('Key5 defaults to (default): ' + key5)



console.log()
console.log('------------------------')
console.log('Unpack an object as differently called variables')
console.log()

const { key1: first, key4: fourth, key5: fifth = 'default', ...rest3 } = obj;

console.log('first  contains the value of key1 value (1): ' + first)
console.log('fourth contains the value of key4 value (4): ' + fourth)
console.log('fifth defaults to (default) since no key5 is present on the object: ' + fifth)
console.log('Object with all the remaining key/value pairs  {key2: 2, key3: 3} :'+ Helper.print_map(rest3))


console.log()
console.log('------------------------')
console.log('Unpacking an object as a function parameter')
console.log()


function objectDestructuring({ key1, key4: fourth, key5: fifth = { obj: 'default' }, ...rest} = { key: 1 }) {
    console.log('key1  contains the value of key1 value (1): ' + key1)
    console.log('fourth contains the value of key4 value (4): ' + fourth)
    console.log('fifth defaults to ({ obj: \'default\' }) since no key5 is present on the object: ' +  Helper.print_map(fifth))
    console.log('Object with all the remaining key/value pairs  {key2: 2, key3: 3} :'+ Helper.print_map(rest))
}

objectDestructuring(obj)


console.log()
console.log('------------------------')
console.log('Unpacking an object as a function parameter using a default function parameter')
console.log()

function objectDestructuring2({ key1, ...rest} = { key2: 1, key3: 3 }) {
    console.log('key1  is undefined: ' + key1)
    console.log('Object with all the remaining key/value pairs  {key2: 2, key3: 3} :'+ Helper.print_map(rest))
}

objectDestructuring2()




const nested = {
    name: 'Daniel',
    languages: {
        1: 'javascript',
        2: 'java',
        3: 'c#'
    }
}

console.log()
console.log('------------------------')
console.log('Nested object destructuring')
console.log()


const { name: MyName, languages: { 1: main, 2: second, 3: third } } = nested

console.log('The variable MyName contains the value of name in the object (Daniel): ' + MyName);
console.log('The variable main contains the "1" key/value of the nested language object (javascript): ' + main);
console.log('The variable second contains the "2" key/value of the nested language object (java): ' + second);
console.log('The variable third contains the "3" key/value of the nested language object (c#): ' + third);


console.log()
console.log('------------------------')
console.log('Spreading a object into another')
console.log()


const spreaded = { ...nested };
const flattened = { name: nested.name, ...nested.languages }
const testing = { ...nested, languages: [...Object.values(nested.languages)] }
console.log(spreaded)
console.log(flattened)
console.log(testing)




console.log()
console.log('------------------------')
console.log('Using literals to rename keys')
console.log()

const testObj = { aLiteralValue: 'I want this value saved in variable bla'}
const literal = 'aLiteralValue';

const { [literal]: bla } = testObj

console.log(bla)



console.log()
console.log('------------------------')
console.log('Combining both')
console.log()


const objArr = [{ a: 1, b: 2}, { a: 'I want this value', b: 4}]

const [ , { a: arrIndex2valueOfA }] = objArr
console.log(arrIndex2valueOfA)