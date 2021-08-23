
const Inout = new (require('../../Inout'))('Coding Questions --- Diagonal Traversal - [difficulty: Medium]');
const Helper = require('../../Helper');

/*
    
    Given a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order.

*/

Inout.input_stringConverter = Helper.printMatrix;

Inout.push('&AR 1,2,3|4,5,6|7,8,9', '&AR 1,2,4,7,5,3,6,8,9')
Inout.push('&AR a,b,c,d|e,f,g,h|i,j,k,l|m,n,o,p', '&AR a,b,e,i,f,c,d,g,j,m,n,k,h,l,o,p')
Inout.push('&AR 0,1,2,3,4|5,6,7,8,9|a,b,c,d,e|f,g,h,i,j|k,l,m,n,o|p,q,r,s,t', '&AR 0,1,5,a,6,2,3,7,b,f,k,g,c,8,4,9,d,h,l,p,q,m,i,e,j,n,r,s,o,t')

Inout.solvers = [diagonalTraverse, diagonalTraverse2, diagonalTraverse3];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function diagonalTraverse(matrix) {

    let row = 0;
    let col = 0;

    let direction = 1;
    const traversal = [];

    while (row < matrix.length && col < matrix[0].length) {

        traversal.push(matrix[row][col]);
        row -= 1 * direction;
        col += 1 * direction;

        const atBounds =
            row < 0 || col < 0 ||
            row >= matrix.length ||
            col >= matrix[0].length;

        if (atBounds) {

            // Walking from left down to right up, then prefer walking right, if not possible walk down.
            if (direction > 0) {
                if (col === matrix[0].length)
                    row++;
                else
                    col++;
            }
            // Walking from right up to left down, then prefer walking down, if not possible walk right.
            else if (direction < 0) {
                if (row === matrix.length)
                    col++;
                else
                    row++;
            }

            // Reset previous movement and change direction.
            row += 1 * direction;
            col -= 1 * direction;
            direction *= -1;
        }
    }
    return traversal
}


function diagonalTraverse2(matrix) {

    let row = 0;
    let col = 0;

    let direction = 1;
    const traversal = [];

    while (row < matrix.length && col < matrix[0].length) {

        traversal.push(matrix[row][col]);
        row -= 1 * direction;
        col += 1 * direction;

        const atBounds =
            row < 0 || col < 0 ||
            row >= matrix.length ||
            col >= matrix[0].length;

        if (atBounds) {
            // The order of the following if statements is partially important.
            // -  checking for hitting the bottom bound before the left, prevents falsly walking down on the bottomleft corner.
            // -  checking for hitting the right bound before the upper, prevents falsly walking right on the topright corner.

            // If right bound is hit (from walking downleft to rightup) then walk down.
            if (col === matrix[0].length)
                row++;
            // If upper bound is hit (from walking downleft to rightup) then walk right.
            else if (row === -1)
                col++;
            // If bottom bound is hit (from walking rightup to downleft) then walk right.
            else if (row === matrix.length)
                col++;
            // If left bound is hit (from walking rightup to downleft) then walk down.
            else if (col === -1)
                row++;

            // Reset previous movement and change direction.
            row += 1 * direction;
            col -= 1 * direction;
            direction *= -1;

        }
    }

    return traversal
}


function diagonalTraverse3(matrix) {

    let row = 0;
    let col = 0;
    let direction = 1;
    const traversal = [];

    let length = matrix.length * matrix[0].length;
    while (length-- > 0) {

        const element = matrix[row][col];
        traversal.push(element);

        row -= 1 * direction;
        col += 1 * direction;

        // The order of the following if statements is partially important.
        // -  checking for hitting the bottom bound before the left, prevents falsly walking down on the bottomleft corner.
        // -  checking for hitting the right bound before the upper, prevents falsly walking right on the topright corner.

        // If right bound is hit (from walking downleft to rightup) then walk down.
        if (col === matrix[0].length) {
            col = matrix[0].length - 1;
            row += 2; // +2 to make up for movement UPright by one.
            direction *= -1;
        }
        // If upper bound is hit (from walking downleft to rightup) then walk right.
        else if (row === -1) {
            // Column will be in correct position from upright movement.
            row = 0;
            direction *= -1;
        }
        // If bottom bound is hit (from walking rightup to downleft) then walk right.
        else if (row === matrix.length) {
            col += 2 // +2 to make up for downLEFT movement by one.
            row = matrix.length - 1;
            direction *= -1;
        }
        // If left bound is hit (from walking rightup to downleft) then walk down.
        else if (col === -1) {
            col = 0;
            // row will be in right position from DOWNright movement.
            direction *= -1;
        }
    }

    return traversal
}