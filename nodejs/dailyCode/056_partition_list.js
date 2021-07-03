const Inout = new (require("../Inout"))("DailyCode --- Three Euqals sum");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Apple:

    Given an array of numbers, determine whether it can be partitioned into 3 arrays of equal sums.

    For instance,
        [0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1] can be partitioned into:
        [0, 2, 1], [-6, 6, -7, 9, 1], [2, 0, 1] all of which sum to 3.

    class Solution(object):
        def canThreePartsEqualSum(self, A):
        # Fill this in.0

    print(Solution().canThreePartsEqualSum(
        [0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]))
    # True

*/

const check = (test, list) => list.map(sub => sub.reduce((a, b) => a + b)).every( (v,i,arr) => v === arr[0] );

Inout.push('&AR 0,2,1,-6,6,-7,9,1,2,0,1', check)
Inout.push('&AR 0,2,1,-3,3,-6,6,-7,9,1,-3,3,2,0,1', check)
Inout.push('&AR 0,2,1,-6,6,-7,9,1,2,0,12', false)

Inout.solvers = [bruteForce_recursive, variant1, variant2];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function bruteForce_recursive(list, p1, p2) {

    if (p1 !== undefined && p1 === p2) return false;

    if (p1 === undefined) p1 = 0;
    if (p2 === undefined) p2 = list.length - 1;

    const sums = [0, 0, 0];
    for (let i = 0; i < list.length; i++) {
        if (i < p1) sums[0] += list[i];
        else if (i <= p2) sums[1] += list[i];
        else sums[2] += list[i];
    }

    if (sums.every(v => v === sums[0])) {
        return [list.slice(0, p1),
        list.slice(p1, p2+1),
        list.slice(p2+1, list.length)];
    }

    const left = bruteForce_recursive(list, p1 + 1, p2);
    const right = bruteForce_recursive(list, p1, p2 - 1);

    return Array.isArray(left) ? left : right;

}

function variant1(list) {

    const sum = list.reduce((a, b) => a + b);
    if (sum % 3 !== 0) return false;
    
    const targetSum = sum / 3;

    let p1 = 0;
    for (let sum = 0; p1 < list.length && sum !== targetSum; sum += list[p1++]) {}

    let p2 = p1;
    for (let sum = 0; p2 < list.length && sum !== targetSum; sum += list[p2++]) {}

    return [list.slice(0, p1),
        list.slice(p1, p2),
        list.slice(p2, list.length)];
}

function variant2(list) {

    const listSummed = list.reduce((a, b) => a + b);
    if (listSummed % 3 !== 0) return false;
    
    const targetSumP1 = listSummed / 3;
    const targetSumP2 = targetSumP1 * 2;

    const p = [0 , 0];

    for(let i=0, sum = 0; i<list.length; i++) {
        sum += list[i];
        if(sum === targetSumP1) p[0] = i+1;
        if(sum === targetSumP2) p[1] = i+1;
    }

    return [list.slice(0, p[0]),
        list.slice(p[0], p[1]),
        list.slice(p[1], list.length)];
}