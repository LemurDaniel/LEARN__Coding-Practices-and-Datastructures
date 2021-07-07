const Inout = new (require('../Inout'))('DailyCode --- Reshape Matrix');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Facebook:

    Reshaping a matrix means to take the same elements in a matrix but change the row and column length. This means that the new matrix needs to have the same elements filled in the same row order as the old matrix. Given a matrix, a new row size x and a new column size y, reshape the matrix. If it is not possible to reshape, return None.

    Here's an example and some starter code.

    def reshape_matrix(mat, x, y):
    # Fill this in.

    print(reshape_matrix([[1, 2], [3, 4]], 1, 4))
    # [[1], [2], [3], [4]]

    print(reshape_matrix([[1, 2], [3, 4]], 2, 3))
    # None

*/

Inout.input_stringConverter = arg => `\n    Reshaped: (${arg.columns}, ${arg.rows})\n    Matrix:` + Helper.printMatrix(arg.matrix);
Inout.output_stringConverter = arg => arg != 'None' ? Helper.printMatrix(arg) : arg;
Inout.result_stringConverter = Inout.output_stringConverter;

Inout.push({ matrix: '&AR 1,2|3,4', columns: 1, rows: 4 }, '&AR 1|2|3|4')
Inout.push({ matrix: '&AR 1,2|3,4', columns: 4, rows: 1 }, [[1, 2, 3, 4]])
Inout.push({ matrix: '&AR 1,2|3,4', columns: 2, rows: 4 }, 'None')

Inout.solvers = [reshape_matrix];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function reshape_matrix(mat, columns, rows) {

    // Check whether the reshaped matrix can hold the same amount of values as the original.
    if ((mat.length * mat[0].length) != (rows * columns)) return 'None';

    // Initialized new reshaped matrix
    const reshaped = [[]];

    // Iteratie through all elements of the matrix
    for (let row = 0; row < mat.length; row++) {
        for (let col = 0; col < mat[row].length; col++) {

            // Check if last array of reshaped is already of the new column length
            // and append an new empty row in that case.
            if (reshaped[reshaped.length - 1].length == columns) reshaped.push([]);
            // Append the current element into the column on the last row of reshaped.
            reshaped[reshaped.length - 1].push(mat[row][col]);
        }
    }

    return reshaped;
}