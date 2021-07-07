const Inout = new (require('../Inout'))('DailyCode --- Find non duplicate number')

/*

    Hi, here's your problem today. This problem was recently asked by Facebook:

    Given a list of numbers, where every number shows up twice except for one number, find that one number.

    Example:
    Input: [4, 3, 2, 4, 1, 3, 2]
    Output: 1
    Here's the function signature:

    def singleNumber(nums):
    # Fill this in.

    print singleNumber([4, 3, 2, 4, 1, 3, 2])
    # 1

    Challenge: Find a way to do this using O(1) memory.

*/

Inout.push('&AR 4,3,2,4,1,3,2', 1);

Inout.solvers = [findNumber, one_liner];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function findNumber(arr) {

    let num = arr[0];
    for (let i = 1; i < arr.length; i++) num ^= arr[i]

    return num;
}

function one_liner(arr) {

    return arr.reduce((a, b) => a ^ b);

}