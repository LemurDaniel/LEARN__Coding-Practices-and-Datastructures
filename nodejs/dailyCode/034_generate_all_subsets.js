const Inout = new (require("../Inout"))("DailyCode --- Generate all subsets");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Facebook:

    Given a list of unique numbers, generate all possible subsets without duplicates. This includes the empty set as well.

    Here's an example and some starter code.

    def generateAllSubsets(nums):
    # Fill this in.

    print(generateAllSubsets([1, 2, 3]))
    # [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]

*/

Inout.result_Equals = Helper.hasArray_sameValues;

Inout.push('&AR 1,2,3', '&AR |3|2|2,3|1|1,3|1,2|1,2,3');
Inout.push('&AR 12,4,8', '&AR |12|4|12,4|8|12,8|4,8|12,4,8');

Inout.solvers = [generate_all_subsets, generate_subset_methods_combined_into_one];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*
    Each index in the array can be mapped to a bit in an binary number, where a '0-bit' indicates the number missing and
    an '1-bit' indicates the number included in the subset.

    [1, 2, 3]
    
     0  0  0               -> [       ]
     0  0  1               -> [      3]
     0  1  0               -> [   2   ]
     0  1  1               -> [   2, 3]
     1  0  0               -> [1      ]
     1  0  1               -> [1     3]
     1  1  0               -> [1, 2   ]
     1  1  1               -> [1, 2, 3]


*/

function binary_number_to_set(nums, binary) {

    const subset = [];
    for (let num of nums) {
        // Each index corresponds to one bit in the binary number, the current index is represented by the last bit of the binary nubmer.
        // Every iteration the binary number is shifted by one to the right, so that the bit representing the next index is the last bit of the binary number.

        // If the last bit is set, then the number at the current index is included in the subset.
        if (binary & 0b1) subset.push(num)
        // Shift the binary number by one to the right, thereby moving the second-bit to the first position. 0b010 >> 0b1 = 0b001
        binary >>= 1;
    }

    return subset;
}

function generate_all_subsets(nums) {

    // Each position in the list corresponds to one bit in the binary number, with two options:
    //  - The bit being set indicating the number being included in the subset.
    //  - The bit not being set indicating the number being excluded from the subset.
    // This means the number of possibilities equals the maximum binary number with a bit-count equal to the array size.
    // [1,2,3] => size: 3 => 0b000 - 0b111 => 8 Possible distinct subsets. (or 2^3)

    // The Alogrithm start at the max number (0b111 for [1,2,3]) and counts down to zero.
    let binary_count = Math.pow(2, nums.length);
    const subsets = [];

    while (binary_count--)
        subsets.push(binary_number_to_set(nums, binary_count));

    return subsets;
}


function generate_subset_methods_combined_into_one(nums) {

    let binary_count = 0b0;
    const subsets = [];

    while (binary_count < Math.pow(2, nums.length)) {
        let b = binary_count++;
        const set = [];

        for (let num of nums) {
            if (b & 0b1) set.push(num)
            b >>= 1;
        }

        subsets.push(set);
    }

    return subsets;
}