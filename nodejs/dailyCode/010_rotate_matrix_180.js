const Inout = new (require('../Inout'))('DailyCode --- Rotate a 2D Matrix by 180° clockwise');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Uber:

    Given a square 2D matrix (n x n), rotate the matrix by 180 degrees clockwise.

    Here's an example and some starting code:

    def rotate(mat):
    # Fill this in.

    mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    # Looks like
    # 1 2 3
    # 4 5 6
    # 7 8 9

    # Looks like
    # 9 8 7
    # 6 5 4
    # 3 2 1
    print(rotate(mat))
    # [[9, 8, 7], [6, 5, 4], [3, 2, 1]]

*/

Inout.input_stringConverter = Helper.printMatrix;
Inout.output_stringConverter = Helper.printMatrix;
Inout.result_stringConverter = Helper.printMatrix;

Inout.push('&AR 1,2,3|4,5,6|7,8,9', '&AR 9,8,7|6,5,4|3,2,1');
Inout.push('&AR 1,2,3,4|5,6,7,8|9,10,11,12|13,14,15,16', '&AR 16,15,14,13|12,11,10,9|8,7,6,5|4,3,2,1');

Inout.solvers = [RotateMatrix_inPlace, RotateMatrix_inPlace_onePass];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function RotateMatrix_inPlace(mat) {

    // reverse all columns in all rows
    for (let row = 0; row < mat.length; row++) {
        for (let col = 0; col < mat[row].length / 2; col++) {
            const op = mat[row].length - 1 - col;
            const temp = mat[row][op];
            mat[row][op] = mat[row][col];
            mat[row][col] = temp;
        }
    }

    // swap top and bottom rows
    for (let row = 0; row < mat.length / 2; row++) {
        const temp = mat[mat.length - row - 1];
        mat[mat.length - row - 1] = mat[row];
        mat[row] = temp;
    }
}

function RotateMatrix_inPlace_onePass(mat) {

    let en = mat.length * mat[0].length -1;
    let st = 0;

    do { 
        const stRow = Math.floor(st / mat[0].length);
        const enRow = Math.floor(en / mat[0].length);
        const stCol = st % mat[0].length;
        const enCol = en % mat[0].length;

        // console.log('EnABS:  ' + en + ' ROW:  ' + enRow + ' COL:  ' + enCol)
        // console.log('stABS:  ' + st + ' ROW:  ' + stRow + ' COL:  ' + stCol)
        // console.log('-----------------------------------------------------')

        const temp = mat[stRow][stCol];
        mat[stRow][stCol] = mat[enRow][enCol];
        mat[enRow][enCol] = temp;

    } while (++st < --en)

}
