const Inout = new (require ('../../Inout'))('Coding Questions --- Two sum - [difficulty: Easy]');
const Helper = require('../../Helper');

/*
    Given an array of integers, return indices of the two numbers such that they add up to a specific target.

    You may assume that each input would have exactly one solution, and you may not use the same element twice.

    Given nums = [2, 7, 11, 15], target = 9
    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1]
*/

Inout.push( { input: { nums: '2,7,11,15', target: 9 }, output: [0,1] } );

Inout.solvers = [two_sum, two_sum_2];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*
    space complexity: O(n)  - linear 
    time  complexity: O(n)  - linear
*/

function two_sum (nums, target)  {

    const dict = {};

    for(let i = 0; i<nums.length; i++) {
        const num = nums[i];
        if(num in dict) return [Math.min(i, dict[num]), Math.max(i, dict[num])]
        else dict[target - nums[i]] = i;
    }

    return 'None';
}

/*
    space complexity: O(1)  - constant 
    time  complexity: O(n^2)  - quadratic
*/

function two_sum_2 (nums, target)  {

    for(let i = 0; i<nums.length; i++) {
    
        const diff = target - nums[i];
        for(let j = 0; j<nums.length; j++) {
            if(j == i) continue;
            else if(nums[j] == diff)
                return [Math.min(i, j), Math.max(i, j)]
        }
    }

    return 'None';
}