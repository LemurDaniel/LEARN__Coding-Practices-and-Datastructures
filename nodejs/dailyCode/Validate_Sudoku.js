const Inout = new (require ('../Inout'))('DailyCode --- Validate Sudoku');
const { matrix_toString } = require('../Helper');
const Helper = require('../Helper');

/*
    Hi, here's your problem today. This problem was recently asked by Facebook:

    A Sudoku board is a 9x9 grid, where each row, column and each 3x3 subbox contains the number from 1-9. Here's an example of a Sudoku board.
    -------------
    |534|678|912|
    |672|195|348|
    |198|342|567|
    |------------
    |859|761|423|
    |426|853|791|
    |713|924|856|
    |------------
    |961|537|284|
    |287|419|635|
    |345|286|179|
    |------------

    Given a 9x9 board, determine if it is a valid Sudoku board. The board may be partially filled, where an empty cell will be represented by the space character ' '.

    Here's an example and some starting code:

    def validate_sudoku(board):
    # Fill this in.

    board = [
        [5, ' ', 4, 6, 7, 8, 9, 1, 2],
        [6, ' ', 2, 1, 9, 5, 3, 4, 8],
        [1,   9, 8, 3, 4, 2, 5, 6, 7],
        [8,   5, 9, 7, 6, 1, 4, 2, 3],
        [4,   2, 6, 8, 5, 3, 7, 9, 1],
        [7,   1, 3, 9, 2, 4, 8, 5, 6],
        [9,   6, 1, 5, 3, 7, 2, 8, 4],
        [2,   8, 7, 4, 1, 9, 6, 3, 5],
        [3,   4, 5, 2, 8, 6, 1, 7, 9],
    ]

    print(validate_sudoku(board))
    # True
*/

Inout.result_comparer = (arg, arg2) => (arg2.val == 1) == arg;
Inout.convert_input = Helper.string_toIntArray;
Inout.input_string_converter = Helper.matrix_toString;
Inout.result_string_converter = arg => {
    let str = '\n    -- ';
    if(arg.val == 0) str += 'No solutions';
    else if(arg.val == 1) str += 'Exactly one solution';
    else if(arg.val > 2500) str += 'More than 2.500 Solutions';
    else str += 'Multiple Solutions: (The following and ' + (arg.val-1) + ' more)';
    return str + '\n' + Helper.matrix_toString(arg.board);
}

board = '5, /, 4, 6, 7, 8, 9, 1, 2 | '+
        '6, /, 2, 1, 9, 5, 3, 4, 8 | '+
        '1, 9, 8, 3, 4, 2, 5, 6, 7 | '+
        '8, 5, 9, 7, 6, 1, 4, 2, 3 | '+
        '4, 2, 6, 8, 5, 3, 7, 9, 1 | '+
        '7, 1, 3, 9, 2, 4, 8, 5, 6 | '+
        '9, 6, 1, 5, 3, 7, 2, 8, 4 | '+
        '2, 8, 7, 4, 1, 9, 6, 3, 5 | '+
        '3, 4, 5, 2, 8, 6, 1, 7, 9 '

Inout.testcases.push( { input: board, output: true } );

board = '5, /, 4, 6, 7, 8, 9, 1, 2 | '+
        '6, /, 2, 1, 9, 5, 3, 4, 8 | '+
        '1, 9, 8, 3, 4, 2, 5, 6, 7 | '+
        '8, 5, 9, 7, 6, 1, 4, 2, 3 | '+
        '4, 2, 6, 8, 5, 3, 7, 9, 1 | '+
        '7, 1, 3, 9, 2, 4, 8, 5, 6 | '+
        '9, 6, 1, 5, 3, 7, 2, 8, 4 | '+
        '2, 8, 7, 4, 1, 9, 6, 3, 5 | '+
        '3, 4, 5, 2, 8, 6, 1, 3, 9 '

Inout.testcases.push( { input: board, output: false } );

board = '/, /, 4, 3, /, 8, 5, /, / | '+
        '/, 8, /, /, /, /, /, 4, / | '+
        '/, /, 6, 5, /, 7, 1, /, / | '+
        '6, /, 7, /, /, /, 2, /, 5 | '+
        '/, /, /, /, 2, /, /, /, / | '+
        '5, /, 9, /, /, /, 8, /, 1 | '+
        '/, /, 8, 9, 3, 4, 6, /, / | '+
        '/, 3, /, /, /, /, /, 9, / | '+
        '/, /, 2, 7, /, 1, 3, /, / '

Inout.testcases.push( { input: board, output: true } );

board = '/, /, /, /, /, /, /, /, / | '+
        '/, 8, /, /, /, /, /, 4, / | '+
        '/, /, 6, 5, /, 7, 1, /, / | '+
        '6, /, 7, /, /, /, 2, /, 5 | '+
        '/, /, /, /, 2, /, /, /, / | '+
        '5, /, 9, /, /, /, 8, /, 1 | '+
        '/, /, 8, 9, 3, 4, 6, /, / | '+
        '/, 3, /, /, /, /, /, 9, / | '+
        '/, /, 2, 7, /, 1, 3, /, / '

Inout.testcases.push( { input: board, output: false } );

board = '/, /, /, /, /, /, /, /, / | '+
        '/, /, /, /, /, /, /, /, / | '+
        '/, /, /, /, /, /, /, /, / | '+
        '/, /, /, /, /, /, /, /, / | '+
        '/, /, /, /, /, /, /, /, / | '+
        '/, /, /, /, /, /, /, /, / | '+
        '/, /, /, /, /, /, /, /, / | '+
        '/, /, /, /, /, /, /, /, / | '+
        '/, /, /, /, /, /, /, /, / '

Inout.testcases.push( { input: board, output: false } );

Inout.solvers = [Validate_sudoku_iterative];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function Check_cell_valid(grid, row, col) {

    const element = Math.abs(grid[row][col]);

    // Check vertical
    for(let i = 0; i < grid.length; i++) {
        if(i == col) continue;
        else if(Math.abs(grid[row][i]) == element) return false; 
    }

    // Check horizontal
    for(let i = 0; i < grid.length; i++) {
        if(i == row) continue;
        else if(Math.abs(grid[i][col]) == element) return false; 
    }

    // Check 3x3 grid
    for(let i=0; i < 3; i++) {
        for(let j=0; j<3; j++) {
            const curr_row = i + 3*Math.floor(row / 3);
            const curr_col = j + 3*Math.floor(col / 3);

            if(curr_col == col && curr_row == row) continue;
            else if(Math.abs(grid[curr_row][curr_col]) == element) return false;
        }
    }

    return true;
}


function Validate_sudoku_iterative(grid) {

    const stack = [];
    let col = 0;
    let row = 0;
    let jump_back = false;
    let solutions_count = 0;
    let solved_board;
    
    while(row <= 9) {

        jump_back = false;
        if( row < 9 && grid[row][col] == '/') grid[row][col] = 0;

        // count one solution when end of board is reached
        // then jump back to search for more solutions
        if( row == 9 ) {
            jump_back = true;
            //if(solutions_count++ > 0) break;
            solutions_count++;
            if(!solved_board) solved_board = Inout.input_copy_method(grid);
            if(solutions_count > 2500) break;
        } 

        // initially empty cells hold values from -1 to -9
        else if(grid[row][col] <= 0) {
            // jump back when all options are exhausted
            if(grid[row][col]-- == -9) { 
                grid[row][col] = '/';
                jump_back = true; 
            }
            // continue to next iteration when cell is invalid
            else if(!Check_cell_valid(grid, row, col)) continue;
            // save position when cell is valid
            else stack.push( { row: row, col: col } );
        }

        // if cell has static value check if its valid
        else if(!Check_cell_valid(grid, row, col)) jump_back = true;
        
        // jump back to cell without static value
        // or move forward by one cell
        if(jump_back) {
            if(stack.length == 0) break;
            col = stack[stack.length-1].col;
            row = stack.pop().row;
        } else {
            if(col == 8) row++;
            col = (col+1) % 9; 
        }
    }

    return { val: solutions_count, board: solved_board ?? grid }
}