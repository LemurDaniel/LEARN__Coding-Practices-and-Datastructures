const Inout = new (require('../Inout'))('DailyCode --- Find fixed point');
const Helper = require('../Helper');

/*
    Hi, here's your problem today. This problem was recently asked by Apple:

    A fixed point in a list is where the value is equal to its index. 
    So for example the list [-5, 1, 3, 4], 1 is a fixed point in the list since the index and value is the same. 
    Find a fixed point (there can be many, just return 1) in a sorted list of distinct elements, or return None if it doesn't exist.

    Here is a starting point:

    def find_fixed_point(nums):
    # Fill this in.

    print find_fixed_point([-5, 1, 3, 4])
    # 1
*/

Inout.push('&AR -5,1,3,4', 1);
Inout.push('&NI 11111111111111', 1);


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


/*
    space complexity: O(1) - constant 
    time  complexity: O(n) - linear
*/

function findFixedPoint_linear(arr) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == i) return i;
    }
}

const findFixedPoint_oneLiner = (arr) => arr.filter((v, i) => v == i)[0];


/*
    space complexity: O(1)      - constant 
    time  complexity: O(log n)  - logarithmic
*/

function findFixedPoint_binarySearch(arr) {

    let upper = arr.length - 1;
    let lower = 0;

    while (upper > lower) {

        // middle index between upper and lower bound
        const mid = Math.floor((upper + lower) / 2);
        
        if (mid === arr[mid]) return mid;
        else if (mid > arr[mid]) lower = mid + 1;
        else upper = mid - 1;
    }
}


Inout.solvers = [findFixedPoint_linear, findFixedPoint_oneLiner, findFixedPoint_binarySearch];
Inout.solve();