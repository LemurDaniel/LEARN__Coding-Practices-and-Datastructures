const Inout = new (require("../Inout"))("DailyCode --- Number of 1 Bits");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Facebook:

    Given a matrix that is organized such that the numbers will always be sorted left to right, and the first number of each row will always be greater than the last element of the last row (mat[i][0] > mat[i - 1][-1]), search for a specific value in the matrix and return whether it exists.

    Here's an example and some starter code.

    def searchMatrix(mat, value):
    # Fill this in.
    
    mat = [
        [1, 3, 5, 8],
        [10, 11, 15, 16],
        [24, 27, 30, 31],
    ]

    print(searchMatrix(mat, 4))
    # False

    print(searchMatrix(mat, 10))
    # True


*/

Inout.input_string_converter = arg => '\n     Value: ' + arg.val + '\n     Matrix:' + Helper.matrix_toString(arg.mat); 

Inout.push({ mat: '&AR 1,3,5,8|10,11,15,16|24,27,30,31', val: 4 }, false);
Inout.push({ mat: '&AR 1,3,5,8|10,11,15,16|24,27,30,31', val: 10 }, {row: 1, col: 0});
Inout.push({ mat: '&AR 1,3|5,8|10,11|15,16|24,27|30,31', val: 10 }, {row: 2, col: 0});

Inout.solvers = [binary_search_matrix];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function binary_search_matrix(mat, value) {

    const abs_to_rel = abs => new Object({ row: Math.floor(abs/mat[0].length), col: abs%mat[0].length});

    let lower  = 0;
    let upper  = (mat.length * mat[0].length) - 1;
    
    while(lower <= upper) {

        const mid = Math.round( (upper + lower) / 2 );
        const pos = abs_to_rel(mid);
        const el  = mat[pos.row][pos.col];

        if(el > value) upper = mid - 1;
        else if(el < value) lower = mid + 1;
        else return pos;
    }

    return false;
}
