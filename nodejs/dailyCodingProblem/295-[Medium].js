const Inout = new (require("../Inout"))("Daily Coding Problem --- Pascals Triangle");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Stitch Fix.

    Pascal's triangle is a triangular array of integers constructed with the following formula:

    The first row consists of the number 1.
    For each subsequent row, each element is the sum of the numbers directly above it, on either side.
    For example, here are the first few rows:

            1
           1 1
          1 2 1
         1 3 3 1
        1 4 6 4 1
    Given an input k, return the kth row of Pascal's triangle.

    Bonus: Can you do this using only O(k) space?
*/

Inout.push(0, [])
Inout.push(1, '&AR 1')
Inout.push(2, '&AR 1,1')
Inout.push(3, '&AR 1,2,1')
Inout.push(4, '&AR 1,3,3,1')
Inout.push(5, '&AR 1,4,6,4,1')
Inout.push(15, '&AR 1,14,91,364,1001,2002,3003,3432,3003,2002,1001,364,91,14,1')
Inout.push(17, '&AR 1,16,120,560,1820,4368,8008,11440,12870,11440,8008,4368,1820,560,120,16,1')
Inout.push(35, Inout.static.None)

Inout.solvers = [getKthRow_oneArray]

Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function getKthRow_oneArray(k) {

    if(k <= 0) return [];

    let row = [1];
    while(--k > 0) {

        // Start and ending values will always be one.
        row.push(1);

        // Each row is essentially a palindrome, therefore all values can be set from left and right converging twoards the middle.
        const middle = Math.ceil(row.length / 2);

        // prev stores the value of at index (i-1) of the previous row, which is overidden by the new row's value each iteration.
        for(let i=1, prev=1; i<middle; i++) {

            // Temporarily store the to be overriden value.
            const temp = row[i];

            // Add the previously overriden value with the current value.
            const next = prev + row[i];
            // Save both of the on their left and right position in the row.
            row[row.length-i-1] = next;
            row[i] = next;

            // Save the temp value as the previous value for the next iteration.
            prev = temp;
        }
    }

    return row;
}

// Note other solutions: https://www.codesdope.com/blog/article/pascal-triangle-algorithm/