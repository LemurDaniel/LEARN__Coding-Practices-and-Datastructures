const Inout = new (require("../Inout"))("DailyCode --- Is Leaf similar");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Microsoft:

    Given an array of heights, determine whether the array forms a "mountain" pattern. A mountain pattern goes up and then down.

    Like
      /\
     /  \
    /    \
    class Solution(object):
    def validMountainArray(self, arr):
        # Fill this in.

    print(Solution().validMountainArray([1, 2, 3, 2, 1]))
    # True

    print(Solution().validMountainArray([1, 2, 3]))
    # False

*/

Inout.push( '&NI 21', false );
Inout.push( '&NI 355', false );
Inout.push( '&NI 0321', true );
Inout.push( '&NI 12321', true );
Inout.push( '&NI 123', false );

Inout.solvers = [validMountainArray];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function validMountainArray (array) {

    // Each array must have passed the ascending and descending stage once.
    let ascended  = false;
    let descended = false;

    for(let i=1; i<array.length; i++) {

        // Next element bigger than previous. (Ascending)
        if( array[i] > array[i-1] ) {

            // If its ascending again after having descended return false.
            if(descended) return false;
            ascended = true;
        }

        // Next element smaller than previous. (Descending)
        else if( array[i] < array[i-1] ) {
            
            // If its descending before having ascended return false.
            if(!ascended) return false;
            descended = true;
        }

        // Elements equal each other.
        else return false;
    }


    return ascended && descended;
}