
const Inout = new (require ('../../Inout'))('Coding Questions --- Move zeroes - [difficulty: Easy]');
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
    time  complexity: O(n)  - linear (one pass)
*/

function move_zeroes (array)  {

   let ptr_start = 0;
   let count_zeros = 0;

   for(let i=0; i<array.length; i++) {
        
        // move all non zero elements to start of array
        if(array[i] != 0) array[ptr_start++] = array[i];
        // count number of 0's in array
        else count_zeros++;

        // array length equals the sum of the number of zero and non-zero values
        // array.length = count of 0's + count of non-0's
        // ==> index of first 0 is at => array.length - count_zeroes
        // ==> if current index 'i' is at or beyond this index, start replacing all following values with 0's
        if( i >= array.length - count_zeros ) array[i] = 0;
   }
}