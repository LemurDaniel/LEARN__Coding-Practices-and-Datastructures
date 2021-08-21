
const Inout = new (require('../../Inout'))('Coding Questions --- Container with most water - [difficulty: Medium]');
const Helper = require('../../Helper');

/*

    Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai).
    n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0).
    Find two lines, which together with x-axis forms a container, such that the container contains the most water.

    Note: You may not slant the container and n is at least 2.

*/

Inout.result_Equals = (oup, res) => (typeof res === 'object' && res.maxWater === oup) || (res === oup)

Inout.push('&AR 1,8,6,2,5,4,8,3,7', 49)
Inout.push('&AR 1,1', 1)
Inout.push('&AR 4,3,2,1,4', 16)
Inout.push('&AR 1,2,1', 2)

Inout.solvers = [mostWater, mostWater_minimal];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function mostWater(array) {

    let ptr_start = 0;
    let ptr_end = array.length - 1;

    let maxWater = 0;
    let indexStart = 0;
    let indexEnd = 0;
    let maxLength = 0;
    let maxHeight = 0;

    while (ptr_start < ptr_end) {

        const hStart = array[ptr_start];
        const hEnd = array[ptr_end];
        const length = ptr_end - ptr_start
        const water = Math.min(hStart, hEnd) * length;

        if (water > maxWater) {
            maxWater = water;
            indexStart = ptr_start;
            indexEnd = ptr_end;
            maxLength = length;
            maxHeight = Math.min(hStart, hEnd);
        }

        if (hStart > hEnd)
            ptr_end--;
        else
            ptr_start++;
    }

    return {
        maxWater: maxWater,
        containerLength: maxLength,
        containerHeight: maxHeight,
        indexStart: indexStart,
        indexEnd: indexEnd,
    }
}


function mostWater_minimal(array) {

    let ptr_start = 0;
    let ptr_end = array.length - 1;

    let maxWater = 0;

    while (ptr_start < ptr_end) {

        const hStart = array[ptr_start];
        const hEnd = array[ptr_end];
        const length = ptr_end - ptr_start
        const water = Math.min(hStart, hEnd) * length;

        maxWater = Math.max(water, maxWater);

        if (hStart > hEnd)
            ptr_end--;
        else
            ptr_start++;
    }

    return maxWater

}