
const Inout = new (require('../../Inout'))('Coding Questions --- Game of Life - [difficulty: Medium]');
const LinkedList = require('../../datastructures/linkedList');
const Helper = require('../../Helper');

/*
   According to the wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970"

   Given a board with m by n cells, each cell has an initial stat live(1) or dead(0). Each cell interacts with its eight neigbors (horizontal, vertical, diagonal) using the following rules:

   * Any live cell with fewer than two live neighbours dies, as if caused by under-population.
   * Any live cell with two or three live neighbors lives on to the next generation.
   * Any live cell with more then three live neighbours dies, as if by overpopulation..
   * Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
   * Write a function to compute the next stage (after one update) of the board given its current state.
   
   Follow up:
   * Could you solve it in-place? Remeber that the board needs to be updated at the same time: You cannot update some cells first and then use their updated values to update other cells.
   * In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches the border of the array.
   How would you adress these problems.
*/

const IS_LIVE = '#';
const IS_NOTLIVE = '-'

Inout.input_stringConverter = arg => Helper.default_StringConverter(
    { ...arg, board: Helper.printMatrix(arg.board, true, 2) }
)

Inout.result_stringConverter = arg => {

    const patternsOnLine = Math.floor(55 / arg[0].length);
    let boardsString = '';

    while (arg.length > 0) {
        const stack = [];
        const lines = [];

        while (arg.length > 0 && stack.length < patternsOnLine)
            stack.push(arg.shift())

        while (stack[0].length > 0) {
            const line = [];
            for (let i = 0; i < stack.length; i++) {
                const tmp = stack[i].shift();
                line.push(...tmp);
                line.push(' ')
            }
            lines.push(line);
        }

        const str = Helper.printMatrix(lines, true, 3)
        boardsString += str + '\n';
    }

    return boardsString;
}

Inout.result_Converter = arg => {
    for (board of arg) {
        for (row of board) {
            for (let i = 0; i < row.length; i++) {
                row[i] = row[i] === 1 ? IS_LIVE : IS_NOTLIVE;
            }
        }
    }
    return arg;
}

Inout.input_Converter = arg => {
    Helper.default_Converter(arg);

    // Set initial State.
    arg.board = [];
    for (let i = 0; i < arg.m; i++) {
        arg.board.push(
            new Array(arg.n).fill(0)
        )
    }

    for (const [row, col] of arg.state)
        arg.board[row][col] = 1;

    return arg;
}



Inout.push({ m: 4, n: 4, steps: 4, state: '&AR 1,1|1,2|2,1|2,2' }, Inout.static.None)
Inout.push({ m: 8, n: 8, steps: 3, state: '&AR 4,3|3,3|3,4|3,5' }, Inout.static.None)
Inout.push({ m: 9, n: 9, steps: 23, state: '&AR 3,4|4,4|4,3|4,5' }, Inout.static.None)


Inout.solvers = [calculateNextStates, calculateNextStates_inPlace];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


//  State caluclation:
//      time complexity: linear -- n
//      space complexity: linear -- n

function calculateNextStates(board, steps) {

    const LIVING = 1;
    const DEAD = 0;
    let trace = [board];

    let newBoard = [];
    while (steps-- > 0) {

        // Calculate next states
        for (let i = 0; i < board.length; i++) {

            // Start with all alive in the next state.
            newBoard.push(
                new Array(board[i].length).fill(DEAD)
            );

            for (let j = 0; j < board[i].length; j++) {

                let activeNeighbours = 0;
                const isLiveCell = board[i][j] === LIVING;

                // Move around postion in 45 degree angles and look at all neighbours.
                for (let rad = 0; rad < (Math.PI * 2); rad += Math.PI / 4) {

                    const col = j + Math.round(Math.cos(rad));
                    const row = i + Math.round(Math.sin(rad));

                    if (row < 0 || row >= board.length) continue;
                    if (col < 0 || col >= board[i].length) continue;

                    if (board[row][col] === LIVING)
                        activeNeighbours++;
                }

                if (activeNeighbours < 2 || activeNeighbours > 3)
                    newBoard[i][j] = DEAD;
                else if (isLiveCell || (!isLiveCell && activeNeighbours === 3))
                    newBoard[i][j] = LIVING;

            }
        }

        board = newBoard;
        newBoard = [];
        trace.push(board)
    }

    return trace;
}



//  State caluclation:
//      time complexity: linear -- 2n
//      space complexity: constant -- 1
// 2 Bits: current state | next state

function calculateNextStates_inPlace(board, steps) {

    let trace = [
        board.map(arr => arr.map(v => v))
    ];

    while (steps-- > 0) {

        // First shift all bits to left as current bits.
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = board[i][j] << 1 & 0b11;
            }
        }

        // Set the first bits indicating the next state.
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {

                const curr = board[i][j] >> 1;
                const isLiveCell = curr === 1;
                let activeNeighbours = 0;

                // Move around postion in 45 degree angles and look at all neighbours.
                for (let rad = 0; rad < (Math.PI * 2); rad += Math.PI / 4) {

                    const col = j + Math.round(Math.cos(rad));
                    const row = i + Math.round(Math.sin(rad));

                    if (row < 0 || row >= board.length) continue;
                    if (col < 0 || col >= board[i].length) continue;

                    if (board[row][col] >> 1 === 1)
                        activeNeighbours++;
                }

                if (activeNeighbours < 2 || activeNeighbours > 3)
                    board[i][j] &= 0b10;    // Last bit must be zero.
                else if (isLiveCell || (!isLiveCell && activeNeighbours === 3))
                    board[i][j] |= 0b01;    // Last bit must be one.
            }
        }
        trace.push(board.map(arr => arr.map(v => v & 0b1)))
    }

    return trace;
}