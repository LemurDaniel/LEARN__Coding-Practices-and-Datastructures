
const Inout = new (require ('../../Inout'))('DailyCode --- Sort Colors');
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


for(let i=0; i<20; i++)
{
    const arr = [];
    for(let i=(Math.round(Math.random()*15)+8); i>=0; i--){
        arr.push( Math.floor(Math.random()*3) );
    }

    Inout.push(arr, Helper.default_copy(arr).sort() )
}

Inout.solvers = [sort_colors_one_pass];
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
    The value at ptr_start can only be a one when the current index i in the loop
    euqals ptr_start which has no effect at all.

*/

function sort_colors_one_pass (colors)  {

   let ptr_end = colors.length-1;
   let ptr_start = 0; 

   for(let i=0; i<=ptr_end; i++) {

        if(colors[i] == 2) {
            while(colors[ptr_end] == 2 && ptr_end > i) ptr_end--;
            colors[i] = colors[ptr_end];
            colors[ptr_end--] = 2;
        }

        if(colors[i] == 0) {
            colors[i] = colors[ptr_start];
            colors[ptr_start++] = 0;
        }

        // console.log(Helper.print_Array(colors) + '  Start: ' + ptr_start + '  I: ' + i + '  End: ' + ptr_end);
   }
}