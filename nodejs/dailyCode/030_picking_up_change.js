const Inout = new (require("../Inout"))("DailyCode --- Picking up Change");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Amazon:

        Given a 2d n x m matrix where each cell has a certain amount of change on the floor, 
        your goal is to start from the top left corner mat[0][0] 
        and end in the bottom right corner mat[n - 1][m - 1] with the most amount of change. 
        You can only move either left or down.

        Here's some starter code:

        def max_change(mat):
          # Fill this in.

        mat = [
            [0, 3, 0, 2],
            [1, 2, 3, 3],
            [6, 0, 3, 2]
        ]

        print(max_change(mat))
        # 13   * 

*/


Inout.input_stringConverter = Helper.printMatrix;

Inout.push('&AR 0,3,0,2|1,2,3,3|6,0,3,2', 13);

Inout.solvers = [pickingUpChange, pickingUpChange_recursive];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function pickingUpChange(mat) {

    for (let row = mat.length - 1; row >= 0; row--) {
        for (let col = mat[row].length - 1; col >= 0; col--) {

            const down = (row + 1 >= mat.length ? 0 : mat[row + 1][col])
            const right = (col + 1 >= mat[row].length ? 0 : mat[row][col + 1]);

            if (down > right) mat[row][col] += down;
            else mat[row][col] += right;
        }
    }

    return mat[0][0];
}

function pickingUpChange_recursive(mat, row = 0, col = 0, val = 0) {

    if (row >= mat.length || col >= mat[row].length) return val;

    const down = val + mat[row][col] + pickingUpChange_recursive(mat, row + 1, col);
    const right = val + mat[row][col] + pickingUpChange_recursive(mat, row, col + 1);

    return down > right ? down : right;
}