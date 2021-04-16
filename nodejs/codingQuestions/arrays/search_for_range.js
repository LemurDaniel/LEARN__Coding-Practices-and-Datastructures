const Inout = new (require ('../../Inout'))('DailyCode --- Search for range');
const Helper = require('../../Helper');

/*
    Given an array of integers sorted in ascending order, ind the starting and ending position of
    a given target value.

    if the target is not found in the array, return [-1, -1]

*/

Inout.map_input = (inp, solver) => solver(inp.nums, inp.target);

Inout.push( { input: { nums: '1,1,1,2,2,2,3,3', target: 2 },  output: [3,5] } );
Inout.push( { input: { nums: '1,1,1,2,2,2,3,3', target: 0 }, output: [-1,-1] } );

Inout.solvers = [search_range];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/



function search_range (nums, target) {
    const start = Helper.binary_search_lower_bound(nums, target);
    if(start == -1) return [-1, -1];
    else return [start, Helper.binary_search_upper_bound(nums, target, start)];
}