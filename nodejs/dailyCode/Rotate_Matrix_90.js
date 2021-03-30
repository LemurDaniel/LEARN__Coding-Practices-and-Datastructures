const Inout = new (require ('../Inout'))('DailyCode --- Rotate a 2D Matrix by 90° clockwise');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Uber:

    Given a square 2D matrix (n x n), rotate the matrix by 90 degrees clockwise.

    Here's an example and some starting code:

    def rotate(mat):
    # Fill this in.

    mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    # Looks like
    # 1 2 3
    # 4 5 6
    # 7 8 9

    # Looks like
    # 7 4 1
    # 8 5 2
    # 9 6 3
    print(rotate(mat))
    # [[7, 4, 1], [8, 5, 2], [9, 6, 3]]

*/

Inout.input_string_converter = Helper.matrix_toString;
Inout.output_string_converter = Helper.matrix_toString;
Inout.result_string_converter = Helper.matrix_toString;

Inout.testcases.push({  input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], 
                        output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] 
});

Inout.solvers = [Rotate_Matrix, Rotate_Matrix_in_place];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function Rotate_Matrix(mat){

    // new rotated matrix
    rotatet = [];

    for(let col=0; col<mat[0].length; col++){
        // rotate every row into a new array which will become the columns of the rotated matrix
        const rotate_col = [];
        for(let row=mat.length-1; row>=0; row--){
            rotate_col.push(mat[row][col]);
        }
        // push rotated row into the new matrix
        rotatet.push(rotate_col);
    }

    return rotatet;
}

function Rotate_Matrix_in_place(mat){

    // swap top and bottom rows
    for(let row=0; row<mat.length/2; row++){
        const temp = mat[mat.length-row-1];
        mat[mat.length-row-1] = mat[row];
        mat[row] = temp;
    }

    // swap [col, row] with [row, col] ==> so that columns become rows
    for(let row=0; row<mat.length/2; row++){
        for(let col=row; col<mat[row].length; col++){
            const temp = mat[row][col];
            mat[row][col] = mat[col][row];
            mat[col][row] = temp;
        }
    }
}