const Inout = new (require("../Inout"))("DailyCode --- Spiral traversal of a Grid");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Amazon:

    You are given a 2D array of integers. Print out the clockwise spiral traversal of the matrix.

    Example:

    grid = [[1,  2,  3,  4,  5],
            [6,  7,  8,  9,  10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20]]

    The clockwise spiral traversal of this array is:

    1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12

    Here is a starting point:

    def matrix_spiral_print(M):
    # Fill this in.

    grid = [[1,  2,  3,  4,  5],
            [6,  7,  8,  9,  10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20]]

    matrix_spiral_print(grid)
    # 1 2 3 4 5 10 15 20 19 18 17 16 11 6 7 8 9 14 13 12

*/

Inout.input_string_converter = Helper.matrix_toString

Inout.push( '&AR 1,2,3,4,5|6,7,8,9,10|11,12,13,14,15|16,17,18,19,20', '&AR 1 2 3 4 5 10 15 20 19 18 17 16 11 6 7 8 9 14 13 12' );

Inout.solvers = [spiral_matrix];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function spiral_matrix ( mat ) {

    // The boundaries on each side.
    // When the boundary of one side is hit, the direction changes and the boundary is adjusted to exclude the passed elements.
    const bounds = { left: 0, 
                     right: mat[0].length-1,  // columns
                     top: 0, 
                     bot: mat.length-1,  // rows
                    }

    const list = [];
    let direction = 0;
    let pos = { col: -1, row: 0 };

    while(bounds.left < bounds.right || bounds.top < bounds.bot) {

    
        // Make a copy of pos and apply a move in one direction.
        const mov = { ...pos };
        if(direction == 0) mov.col++;           // right
        else if(direction == 1) mov.row++;      // down
        else if(direction == 2) mov.col--;      // left
        else if(direction == 3) mov.row--;      // up


        // Check whether the move went out of bounds and change bounds accordingly.
        if( mov.col > bounds.right ) bounds.top++;        // When 'right' bound is hit, then change directon to 'down'  and increase 'top'   boundary.
        else if( mov.row > bounds.bot ) bounds.right--;   // When 'bot'   bound is hit, then change directon to 'left'  and decrease 'right' boundary.
        else if( mov.col < bounds.left ) bounds.bot--     // When 'left'  bound is hit, then change directon to 'up  '  and decrease 'bot'   boundary.
        else if( mov.row < bounds.top ) bounds.left++;    // When 'top'   bound is hit, then change directon to 'right' and increase 'left'  boundary.
        else {
            // If no bound was hit then continue in same direction and update position to the newly made move.
            list.push(mat[mov.row][mov.col])
            pos = mov;
            continue;
        }

        // If a bound was hit, then change the directio and don't update the position.
        direction = (direction + 1) % 4;

    }

    return list;
}