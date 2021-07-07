
const Inout = new (require('../../Inout'))('Coding Questions --- Move zeroes - [difficulty: Easy]');
const Helper = require('../../Helper');

/*
    Given an array nums, write a function to move all 0's to the end of it while maintaining the relative
    order of the non-zero elements.

    For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].

    Note:
    Your must do this in-place without making a opy of the array.
    Minimize the total number of operations
*/


Inout.push('&AR 0,1,0,3,12', '&AR 1,3,12,0,0')
Inout.push('&AR 0,1,0,3,12,34,0,8,2,0,0,0,90,0,44,42,0,39', '&AR 1,3,12,34,8,2,90,44,42,39,0,0,0,0,0,0,0,0')
Inout.push('&AR 1,3,12,34,8,2,0,0,0,90,0,44,42,0,0,0,0,39', '&AR 1,3,12,34,8,2,90,44,42,39,0,0,0,0,0,0,0,0')

Inout.solvers = [move_zeroes];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*
    space complexity: O(1)  - constant
    time  complexity: O(n)  - linear
*/

function move_zeroes(array) {

    let ptr_start = 0;
    let count_zeros = 0;

    for (let i = 0; i < array.length; i++) {

        // ptr_start always points to the index after the last moved non-zero element at the start of the array
        // via this all non-zero elements are gradually moved to the start of the array
        if (array[i] != 0) array[ptr_start++] = array[i];
        else count_zeros++;
    }

    // replace all index from the end of the array with zeroes,
    // according to the number of counted zeroes
    while (count_zeros > 0) array[array.length - count_zeros--] = 0;

}