const Inout = new (require("../Inout"))("Daily Coding Problem --- Construct all possible binary trees");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by LinkedIn.

    A wall consists of several rows of bricks of various integer lengths and uniform height. 
    Your goal is to find a vertical line going from the top to the bottom of the wall that cuts through the fewest number of bricks. 
    If the line goes through the edge between two bricks, this does not count as a cut.

    For example, suppose the input is as follows, where values in each row represent the lengths of bricks in that row:

    [[3, 5, 1, 1],
    [2, 3, 3, 2],
    [5, 5],
    [4, 4, 2],
    [1, 3, 3, 3],
    [1, 1, 6, 1, 1]]
    The best we can we do here is to draw a line after the eighth brick, which will only require cutting through the bricks in the third and fifth row.

    Given an input consisting of brick lengths for each row such as the one above, return the fewest number of bricks that must be cut to create a vertical line.

*/

Inout.input_stringConverter = Helper.printMatrix;
Inout.result_Equals = (arg, arg2) => arg2.minimumCuts === arg;

Inout.push('&AR 1|1|1', 3);
Inout.push('&AR 1,2,2,1|3,1,2|1,3,2|2,4|3,1,2]|1,3,1,1', 2);
Inout.push('&AR 3,5,1,1|2,3,3,2|5,5|4,4,2|1,3,3,3|1,1,6,1,1', 2);
Inout.push('&AR 1,2,2,1|3,1, 2|1,3,2|2,4|3,1,2|1,3,1,1', 2);

Inout.solvers = [getMinimumNumberOfCuts]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


// TODO lookup geeks for geeks aproach https://www.geeksforgeeks.org/minimum-number-of-bricks-that-can-be-intersected/
function getMinimumNumberOfCuts(wall) {

    // Transform wall into an array, where 
    // every even index encodes one segment of a brick
    // and every uneven index encodes wheter a gap is following or not.

    // If a new brick begins after of segment the following uneven index will indicate '|' for a gap.
    // If not the following uneven index will contain a '-' indicating a bridge between to brick segments, forming one whole brick.

    const BRG = '-';
    const GAP = '|';


    const unrolledWall = [];

    for (const row of wall) {

        let brickNumber = 0;
        const unrolled = [];

        for (let brick of row) {
            brickNumber++;
            while (brick-- > 0) {
                unrolled.push(brickNumber);
                if (brick !== 0)
                    unrolled.push(BRG)
                else
                    unrolled.push(GAP)
            }
        }

        // Pop right edge of wall.
        unrolled.pop();
        unrolledWall.push(unrolled);
    }


    // Set some constants for nicer code.
    const wallWidth = unrolledWall[0].length;
    const topRow = unrolledWall[0];

    // Record the position with minimum cuts.
    let minimumCuts = Infinity;
    let recordBrick = 0;
    let arryPos = 0;

    for (let i = 0, brickNum = 1; i < wallWidth; i++) {
     
        // Determine bricknumber.
        if (topRow[i] === GAP) brickNum++;

        // Go through all rows of the wall for the current segment index.
        let numCuts = 0;
        for (const row of unrolledWall) {
            const segment = row[i];
            if (segment !== GAP) numCuts++;
        }

        // Record minimum occurence of cuts.
        if (numCuts < minimumCuts) {
            minimumCuts = numCuts;
            recordBrick = brickNum;
            arryPos = i;
        }

    }





    // Generate some nice output array.
    unrolledWall.unshift([])
    for (let i = 0; i < wallWidth; i++)
        unrolledWall[0].push(`(${i + 1})`);

    unrolledWall[0].unshift('#')
    for (let i = 1; i < unrolledWall.length; i++)
        unrolledWall[i].unshift(`(${i})`);


    return {
        minimumCuts: minimumCuts,
        cutAfterBrick: recordBrick - 1,
        arrayIndex: arryPos + 1, // +1 Cause displayed indexes start at 1.
        wall: Helper.printMatrix(unrolledWall),
    }
}