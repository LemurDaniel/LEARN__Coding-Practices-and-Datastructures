
const Inout = new (require('../../Inout'))('Coding Questions --- Sort Colors - [difficulty: Medium]');
const Helper = require('../../Helper');

/*
    Given an array with n objects colored red, white or blue, sort them so that objects of the same color
    are adjacent, with the colors in the order red, white and blue.

    Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively

    Note:
    You are not supposed to use the library's sort function for this problem

    Follow up:
    A rather straight forward solution is a two-pass algorithm using countin sort.
    First, iterate the array counting number of 0's, 1's and 2's, then overwrite array with total
    number of 0's, then 1's and followed by 2's.

    Could you come up with an one-pass algorithm using only constant space?
*/


for (let i = 0; i < 20; i++) {
    const arr = [];
    for (let i = (Math.round(Math.random() * 15) + 8); i >= 0; i--) {
        arr.push(Math.floor(Math.random() * 3));
    }

    Inout.push(arr, Helper.default_Copy(arr).sort())
}

Inout.solvers = [dutchSorting, sort_colors_one_pass, sort_colors_one_pass2, sort_colors_two_passes_counting, sort_colors_two_passes_counting_variant_2];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*
    space complexity: O(1)  - constant 
    time  complexity: O(n)  - linear

    ptr_end points to the start of all 2's at the end of the array.
    ptr_start points to the end of all 1's at the start of the array.

    While passing through the values of the array, Whenever a 2 is encountered,
    the current value get swapped with the one at ptr_end. Then decrease ptr_end.

    if its a 0 instead or a 0 get swapped into place, swap it with the value
    at ptr_start, wich will always be a 1. Then increase ptr_start.
    
    The value at ptr_start will always be a one. It can't be a two, because the loop
    would have already checked the value at that index and moved it to the end. Can't
    be a zero either since it would have already been moved too at this point. 
    The value at ptr_start can only be a zero when the current index i in the loop
    euqals ptr_start which has no effect at all.

*/

function dutchSorting(colors) {

    let low = 0;
    let mid = 0;
    let high = colors.length - 1;

    for (let i = 0; mid <= high; i++) {

        switch (colors[i]) {
            case 0:
                colors[i] = colors[low]
                colors[low] = 0;
                low = low + 1;
                mid = mid + 1;
                break;
            case 2:
                colors[i] = colors[high]
                colors[high] = 2;
                high = high - 1;
                i = i - 1;
                break;
            case 1:
                mid = mid + 1;
                break;
        }
    }
}

function sort_colors_one_pass(colors) {

    // Marks beginning of all twoes.
    let ptr_end = colors.length - 1;
    // Marks end of all zeroes.
    let ptr_start = 0;

    for (let i = 0; i <= ptr_end;) {

        // All twoes are swapped with the end of the array. The index isn't incremented since the swapped value could have been another two.
        if (colors[i] === 2) {
            colors[i] = colors[ptr_end];
            colors[ptr_end--] = 2;
        }

        // Since all previous values are processed the swapped value will be either 1 or 0.
        if (colors[i] === 0) {
            colors[i] = colors[ptr_start];
            colors[ptr_start++] = 0;
            i++;
        }

        // If its a one just move along. Any following zero will be placed at its position and the one will be placed at the occurence of the zero then.
        if (colors[i] === 1)
            i++;

        // console.log(Helper.printArray(colors) + '  Start: ' + ptr_start + '  I: ' + i + '  End: ' + ptr_end);
    }
}

function sort_colors_one_pass2(colors) {

    let ptr_end = colors.length - 1;
    let ptr_start = 0;

    for (let i = 0; i <= ptr_end; i++) {

        if (colors[i] == 2) {
            while (colors[ptr_end] == 2 && ptr_end > i) ptr_end--;
            colors[i] = colors[ptr_end];
            colors[ptr_end--] = 2;
        }

        if (colors[i] == 0) {
            colors[i] = colors[ptr_start];
            colors[ptr_start++] = 0;
        }

        // console.log(Helper.printArray(colors) + '  Start: ' + ptr_start + '  I: ' + i + '  End: ' + ptr_end);
    }
}

/*
    space complexity: O(1)  - constant
    time  complexity: O(2n) => O(n)  - linear (Two passes)
*/

function sort_colors_two_passes_counting(colors) {

    let zeros = 0;
    let ones = 0;

    for (let color of colors) {
        if (color == 0) zeros++;
        else if (color == 1) ones++;
    }

    for (let idx in colors) {
        if (zeros-- > 0) colors[idx] = 0;
        else if (ones-- > 0) colors[idx] = 1;
        else colors[idx] = 2;
    }

}

function sort_colors_two_passes_counting_variant_2(colors) {

    let zeros = 0;
    let ones = 0;

    for (let idx in colors) {
        if (colors[idx] == 0) zeros++;
        else if (colors[idx] == 1) ones++;
        colors[idx] = 2;
    }

    for (let idx in colors) {
        if (zeros-- > 0) colors[idx] = 0;
        else if (ones-- > 0) colors[idx] = 1;
        else return;
    }

}