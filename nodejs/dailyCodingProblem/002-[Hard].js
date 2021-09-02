const Inout = new (require('../Inout'))('Daily Coding Problem --- Multiply elements in array')

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Uber.

    Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

    For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. 
    If our input was [3, 2, 1], the expected output would be [2, 3, 6].

    Follow-up: what if you can't use division?

*/


Inout.push('&AR 1,2,3,4,5', '&AR 120,60,40,30,24');


Inout.solvers = [multiplyNumbers_twoLoops];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*

    Basic approach with two loops:
        For each element loop once again through the array to multiply all numbers to itself.

        --- This approach doesn't use division.

        time complexity: O(n^2)  --- squared       --- For every number the whole list is traversed once.
        space complexity: O(n)   --- linear        --- Saves all values in a new array.
*/
function multiplyNumbers_twoLoops(list) {

    const result = [];

    for (let i = 0; i < list.length; i++) {

        let product = 1;
        for (let j = 0; j < list.length; j++) {
            // Prevent multiplying the same number to itself;
            if (j !== i) product *= list[j];
        }

        result[i] = product;
    }

    return result;
}

