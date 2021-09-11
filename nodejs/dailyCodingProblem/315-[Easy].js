const Inout = new (require("../Inout"))("Daily Coding Problem --- Find ceil and floor in BST");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    In linear algebra, a Toeplitz matrix is one in which the elements on any given diagonal from top left to bottom right are identical.

    Here is an example:

    1 2 3 4 8
    5 1 2 3 4
    4 5 1 2 3
    7 4 5 1 2
    Write a program to determine whether a given input is a Toeplitz matrix.

*/

Inout.push('&AR 1,2,3,4,8|5,1,2,3,4|4,5,1,2,3|7,4,5,1,2', true);


Inout.solvers = [isToeplitzMatrix]
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function checkDiagonal(matrix, row, col) {

    const baseValue = matrix[row][col];
    while (++row < matrix.length &&
        ++col < matrix[0].length) {

        if (matrix[row][col] !== baseValue) return false;
    }

    return true;
}

function isToeplitzMatrix(matrix) {

    // Check diagonal from row=0; col=0;
    if (!checkDiagonal(matrix, 0, 0)) return false;

    for (let i = 1; i < matrix.length; i++) {

        // Check diagonals from row+1 and col+1
        if (!checkDiagonal(matrix, i, 0)) return false;
        if (!checkDiagonal(matrix, 0, i)) return false;
    }

    return true;
}

