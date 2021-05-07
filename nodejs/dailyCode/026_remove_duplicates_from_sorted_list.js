const Inout = new (require ('../Inout'))('DailyCode --- Remove duplicates from sorted list');
const Helper = require('../Helper');

/*

   Hi, here's your problem today. This problem was recently asked by Apple:

    Given a sorted list of size n, with m unique elements (thus m < n), modify the list such that the first m unique elements in the list will be sorted, ignoring the rest of the list. Your solution should have a space complexity of O(1). Instead of returning the list (since you are just modifying the original list), you should return what m is.

    Here's an example and some starter code.

    def remove_dups(nums):
    # Fill this in.

    nums = [1, 1, 2, 3, 4, 4, 4, 4, 4, 5, 5, 6, 7, 9]
    print(remove_dups(nums))
    # 8
    print(nums)
    # [1, 2, 3, 4, 5, 6, 7, 9]

    nums = [1, 1, 1, 1, 1, 1]
    print(remove_dups(nums))
    print(nums)
    # 1
    # [1]


*/

Inout.convert_result = arg => new Object({ arr: arg, m: arg.length });
Inout.convert_output = arg => Inout.convert_result(Helper.convert_strings_in_object(arg))

Inout.push("&AR 1,2,3,4,4,4,4,5,5,6,7,9", "&AR 1,2,3,4,5,6,7,9");
Inout.push("&AR 1,1,1,1,1,1,1", "&AR 1");

Inout.solvers = [remove_duplicates_in_place];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function remove_duplicates_in_place(arr) {

    let ptr_start = 0;
    for(let i=0; i<arr.length; i++) {
        if(arr[i] == arr[ptr_start]) continue;
        else arr[++ptr_start] = arr[i];
    }

    arr.length = ptr_start+1;
}

