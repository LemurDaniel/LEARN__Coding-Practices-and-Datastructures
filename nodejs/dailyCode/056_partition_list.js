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