const Inout = new (require ('../Inout'))('Daily Coding Problem --- Ways to to reach the bottom of a matrix');
const Queue = require('../datastructures/queue')
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Slack.

    You are given an N by M matrix of 0s and 1s. Starting from the top left corner, how many ways are there to reach the bottom right corner?

    You can only move right and down. 0 represents an empty space while 1 represents a wall you cannot walk through.

    For example, given the following matrix:

    [[0, 0, 1],
    [0, 0, 1],
    [1, 0, 0]]
    Return two, as there are only two ways to get to the bottom right:

    Right, down, down, right
    Down, right, down, right
    The top left corner and bottom right corner will always be 0.

*/

Inout.convert_input = Helper.string_toIntArray;
Inout.input_string_converter = Helper.matrix_toString;
Inout.result_comparer = (arg, arg2) => (typeof arg2 == 'number' ? arg2 : arg2.ways) == arg
Inout.result_string_converter = arg => {
    if(typeof arg == 'number') return  arg + ' Ways';;
    return arg.ways + ' Ways\n       ' + Helper.print_Array(arg.paths, ',\n         ');
}

Inout.push( { input: '001|001|100', output: 2 } );
Inout.push( { input: '011|001|100', output: 1 } );
Inout.push( { input: '000|000|000', output: 6 } );
Inout.push( { input: '00111|10011|11001|11100|11110', output: 1 } );

Inout.solvers = [brute_force_recursive, brute_force_iterative, brute_force_iterative2];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function brute_force_recursive(mat, row = 0, col = 0) {

    if(row >= mat.length || col >= mat[0].length || mat[row][col] == 1)
        return 0;
    else if(row == mat.length-1 && col == mat[0].length-1)
        return 1;
    else
        return brute_force_recursive(mat, row+1, col) + brute_force_recursive(mat, row, col+1);

}


function brute_force_iterative(mat) {

    const q = new Queue.NodeQueue( { row: 0, col: 0 } );
    let sum = 0;

    while(!q.isEmpty()) {

        const { row, col } = q.dequeue();

        if(row == mat.length-1 && col == mat[0].length-1)
            sum++;
        else if(row >= mat.length || col >= mat[0].length || mat[row][col] == 1)
            continue;
        else {
            q.enqueue( { row: row+1, col: col } );
            q.enqueue( { row: row, col: col+1 } );
        }
    }
    
    return sum;     
}


function brute_force_iterative2(mat) {

    const q = new Queue.NodeQueue( { row: 0, col: 0, path: '' } );
    let paths = [];

    while(!q.isEmpty()) {

        const { row, col, path } = q.dequeue();
        
        if( row+1 < mat.length && mat[row+1][col] != 1)
            q.enqueue( { row: row+1, col: col, path: path+' Down ' } );
            
        if( col+1 < mat.length && mat[row][col+1] != 1)
            q.enqueue( { row: row, col: col+1, path: path+' Right ' } );
           
        if(row == mat.length-1 && col == mat.length-1)
            paths.push(path)
    }
    
    return { ways: paths.length, paths: paths };     
}