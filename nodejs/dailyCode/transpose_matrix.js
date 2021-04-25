const Inout = new (require ('../Inout'))('DailyCode --- Transpose a 2D Matrix');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Twitter:

    Given a matrix, transpose it. Transposing a matrix means the rows are now the column and vice-versa.

    Here's an example:

    def transpose(mat):
    # Fill this in.

    mat = [
        [1, 2, 3],
        [4, 5, 6],
    ]

    print(transpose(mat))
    # [[1, 4],
    #  [2, 5], 
    #  [3, 6]]

*/

Inout.input_string_converter = Helper.matrix_toString;
Inout.output_string_converter = Helper.matrix_toString;
Inout.result_string_converter = Helper.matrix_toString;

Inout.testcases.push({  input: '&AR 123|456', 
                        output: '&AR 14|25|36' 
});

Inout.solvers = [transpose_matrix];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function transpose_matrix(mat){

    transposed = [];

    for(let col=0; col<mat[0].length; col++){
        
        const new_row = [];
        for(let row=0; row < mat.length; row++){
            new_row.push(mat[row][col]);
        }
        transposed.push(new_row);
    }

    return transposed;
}