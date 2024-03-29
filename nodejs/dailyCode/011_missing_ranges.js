const Inout = new (require('../Inout'))('DailyCode --- Missing Ranges');
const Helper = require('../Helper')

/*

    Hi, here's your problem today. This problem was recently asked by Google:

    Given a sorted list of numbers, and two integers low and high representing the lower and upper bound of a range, return a list of (inclusive) ranges where the numbers are missing. 
    A range should be represented by a tuple in the format of (lower, upper).

    Here's an example and some starting code:

    def missing_ranges(nums, low, high):
    # Fill this in.
    
    print(missing_ranges([1, 3, 5, 10], 1, 10))
    # [(2, 2), (4, 4), (6, 9)]


*/

Inout.push({ Array: '&AR 1, 3, 5, 10', Range: '&AR 1, 10' }, '&AR 2,2 | 4,4 | 6,9')

Inout.solvers = [find_missing_ranges]
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function find_missing_ranges(arr, range) {

    const missing = [];
    for (let i = 1; i < arr.length; i++) {

        // skip all numbers until start of range
        if (arr[i] < range[0]) continue;
        // return when end of range is reached
        else if (arr[i] > range[1]) return;

        // add missing range as tuplet
        if (arr[i] - arr[i - 1] != 1)
            missing.push([arr[i - 1] + 1, arr[i] - 1]);
    }
    return missing;
}