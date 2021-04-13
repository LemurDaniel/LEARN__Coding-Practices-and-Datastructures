const Inout = new (require ('../Inout'))('Daily Coding Problem --- Count smaller element on right side');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    Given an array of integers, return a new array where each element in the new array is the number of smaller elements to the right of that element in the original input array.

    For example, given the array [3, 4, 9, 6, 1], return [1, 1, 2, 1, 0], since:

    There is 1 smaller element to the right of 3
    There is 1 smaller element to the right of 4
    There are 2 smaller elements to the right of 9
    There is 1 smaller element to the right of 6
    There are no smaller elements to the right of 1

*/

Inout.convert_input = Helper.string_toIntArray;
Inout.convert_output = Helper.string_toIntArray;

Inout.push( { input: '34961', output: '11210' } )

Inout.solvers = [find_number_of_smaller_elements, find_number_of_smaller_elements_2];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


/*
    (n is the length of the array)

    time  complexity: quadratic;
    space complexity: linear;
*/

function find_number_of_smaller_elements(arr) {

    const nums = new Array(arr.length);
    nums[nums.length - 1] = 0;

    for(let idx=0; idx<arr.length-1; idx++) {
        
        nums[idx] = 0;
        for(let i=idx+1; i<arr.length; i++)
            nums[idx] +=  (arr[i] < arr[idx] ? 1 : 0) 

    }

    return nums;
}

n + n-1 + n-2 + n-3
/*
    time  complexity: quadratic;
    space complexity: constant;
*/

function find_number_of_smaller_elements_2(arr) {

    for(let idx=0; idx<arr.length-1; idx++) {
        
        const num = arr[idx];
        arr[idx] = 0;

        for(let i=idx+1; i<arr.length; i++)
            arr[idx] += (arr[i] < num ? 1 : 0) 

    }

    arr[arr.length-1] = 0;
}