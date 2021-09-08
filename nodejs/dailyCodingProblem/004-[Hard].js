const Inout = new (require('../Inout'))('Daily Coding Problem --- Find first missing positive in array of integers')

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Stripe.

    Given an array of integers, find the first missing positive integer in linear time and constant space. 
    In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

    For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

    You can modify the input array in-place.

*/


Inout.push('&AR 3,4,-1,1', 2);
Inout.push('&AR 3,-1,4,-1', 1);
Inout.push('&AR 3,4,2,1', 5);
Inout.push('&AR 1,2,0', 3);

Inout.push('&AR 7,8,9,11,12', 1);

Inout.push('&AR 2,3,7,6,8,-1,-10,-15', 1);
Inout.push('&AR 2,3,-7,6,8,1,-10,15', 4);
Inout.push('&AR 1,1,0,-1,-2', 2)

Inout.solvers = [findMissingPositive];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*

    Basic approach with two iterations:
        
        The first iterations sorts each element at its index 'num - 1', while negative values and zeroes are ignored.
        If the same value has already been set to the index 'num - 1' then it is ignored to.
        By this all positive integers will accumulate in order from the beginning of the array.

        The rule is to find the first missing positive beginning at 1.
        All number greater than the length of the array can be ignored, since to reach them, the array has to be filled 
        with all numbers leading up to it, which leaves no space anymore for the number itself anymore.

        All doubly appearing values and negative values won't be sorted, which then cause gaps in the asceding accumulation of numbers.
        The first such gaps indicates the first missing positive and can be calculated by adding 1 to the number of the previous index.
        
        If all numbers from 1 to array.lenght are present, then the missing number is the array.length + 1.

        time complexity: O(2n)  --- linear     --- The algorithm iterates over the array two times.
        space complexity: O(1)  --- constant   --- The array is modified in place, no extra space is needed. 
*/

function findMissingPositive(array) {

    // Put each number greater than zero at index 'num - 1'.
    for (let i = 0; i < array.length; i++) {

        const num = array[i];
        if (num < 0 || num > array.length) continue;
        if (array[num - 1] === num) continue;

        array[i--] = array[num - 1];
        array[num - 1] = num;
    }

    // Loop again through the array and find the number, where the rule 'array[i] === array[i-1]+1' breaks and return that 'lastNum +1' as the solution;
    for (let i = 0, lastNum = 0; i < array.length; i++) {

        if (array[i] !== ++lastNum)
            return lastNum;

    }

    // Reaching this return means the array contains all numbers from 1 to array.length, 
    // which in turn means the next missing positive is after the last index in the array.
    return array.length + 1;
}