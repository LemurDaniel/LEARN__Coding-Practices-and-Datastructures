const Inout = new (require ('../Inout'))('Daily Coding Problem --- Find the duplicate number');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    You are given an array of length n + 1 whose elements belong to the set {1, 2, ..., n}. 
    By the pigeonhole principle, there must be a duplicate. 
    Find it in linear time and space

*/

function add_testcase(len) {
    const arr = [];
    const rand = 1+ Math.floor(Math.random() * len)

    for(let i=1; i<=len; i++){
        arr.push(i);
        if(i == rand) arr.push(rand);
    }
    Helper.scramble_Array(arr);
    Inout.push( { input: arr, output: rand } );
}

for(let i=0; i<10; i++){
    add_testcase(4+Math.floor(Math.random() * 25))
}

Inout.solvers = [find_duplicate_number_xor, find_duplicate_number_sub, find_duplicate_number_sum, find_duplicate_number_arr];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


/*
    Array has values in range [1, n].
    if each index of the array is increased by one then each index
    can be mapped to one number in the array. Using the XOR Operation
    two times with the same operand will nullify the operation. If each
    value in the array has a corresponding index and each value and index
    get XORed all the operations will eventually cancel out except for
    the duplicate number in the array.

    time  complexity: linear;
    space complexity: constant;
*/

function find_duplicate_number_xor(arr) {
    
    // last index the array has no corresponding number
    // This is accounted for by XORing it at the start
    let num = 0 ^ arr.length

    for(let i=0; i<arr.length; i++) {
        num = num ^ (i+1) ^ arr[i];
    }
    
    return num
}

function find_duplicate_number_sub(arr) {
    
    let num = 0 + arr.length

    for(let i=0; i<arr.length; i++) {
        num = num - i-1 + arr[i];
    }
    
    return num
}

function find_duplicate_number_sum(arr) {

    let sum = 0;

    for(let i=0; i<arr.length; i++)
        sum += arr[i];

    const n = arr.length - 1;
    return sum - (n * (n + 1)) / 2;
}


/*
    time  complexity: linear;
    space complexity: linear;
*/

function find_duplicate_number_arr(arr) {

    let ordered = new Array(arr.length - 1);

    for(let i=0; i<arr.length; i++)  {
        const idx = arr[i] - 1;
        if (ordered[idx]) return ordered[idx];
        else ordered[idx] = arr[i]
    }
}