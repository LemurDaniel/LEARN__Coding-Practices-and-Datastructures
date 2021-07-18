const Inout = new (require("../Inout"))("Daily Coding Problem --- Implement a PrefixMapsum");
const LinkedList = require("../datastructures/linkedList");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Yelp.

    You are given an array of integers, where each element represents the maximum number of steps that can be jumped going forward from that element. 
    Write a function to return the minimum number of jumps you must take in order to get from the start to the end of the array.

    For example, given [6, 2, 4, 0, 5, 1, 1, 4, 2, 9], you should return 2, as the optimal solution involves jumping from 6 to 5, and then from 5 to 9.

*/

Inout.output_Converter = (out, test) => {
    const ll = new LinkedList();
    for (let i = 1; i < out.length; i++) {
        const curr = out[i];
        const prev = out[i - 1];
        ll.Append(`[${test.input[prev]} -> ${test.input[curr]}]`)
    }

    return { jumps: out.length - 1, sol: ll }
}
Inout.result_Converter = Inout.output_Converter;

Inout.push('&AR 6,2,4,0,5,1,1,4,2,9', [0, 4, 9]);
Inout.solvers = [burteForce_recursive];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function burteForce_recursive(arr, index = 0) {

    if (index === arr.length - 1) return [index];
    if (index >= arr.length) return null;

    let indexes = null;

    for (let i = arr[index]; i > 0; i--) {

        const res = burteForce_recursive(arr, index + i);

        if (res === null) continue;
        if (indexes === null || res.length < indexes.length) {
            indexes = res;
            res.unshift(index);
        }
    }

    return indexes;
}