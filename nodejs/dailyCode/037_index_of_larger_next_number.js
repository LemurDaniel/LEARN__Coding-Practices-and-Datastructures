const Inout = new (require("../Inout"))("DailyCode --- Index of larger next number");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Google:

    Given a list of numbers, for each element find the next element that is larger than the current element. Return the answer as a list of indices. If there are no elements larger than the current element, then use -1 instead.

    Here's an example and some starter code:

    def larger_number(nums):
    # Fill this in.
    
    # print [2, 2, 3, 4, -1, -1]
    print(larger_number([3, 2, 5, 6, 9, 8]))

*/

Inout.push( '&AR 3,2,5,6,9,8', '&AR 2,2,3,4,-1,-1' );

Inout.solvers = [index_of_larger_next_number];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function index_of_larger_next_number(nums) {

    const indexes = [];

    for(let i=0; i<nums.length; i++) {
        
        const num = nums[i];
        for(let j=i; j<nums.length; j++) {
            if(nums[j] <= nums[i]) continue;
            indexes.push(j);
            break;
        }

        if(indexes.length <= i) indexes.push(-1); 
    }

    return indexes;
}
