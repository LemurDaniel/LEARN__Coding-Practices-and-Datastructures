const Helper = require('../Helper')
const process = require('process')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

class TicTacToe {

    ////////////////////////// Static

    static EMPTY = '#'
    static PLAYERS = ['X', 'O']
    static FLAGS = ['MIDGAME', 'DRAW', 'WIN']

    // Functions to Convert Row,Col to Array-Position and Back
    static getPosition = (row, col) => (row - 1) * 3 + (col - 1)
    static getRowCol = pos => ({
        col: pos % 3 + 1,
        row: Math.floor(pos / 3) + 1
    })

    ////////////////////////// Getters, Setters

    // Gets a copy of the TicTacToe object with the current state
    get copy() {
        return new TicTacToe(this.board.join('').split(''), this.currentPlayer)
    }

    get player() {
        return TicTacToe.PLAYERS[this.currentPlayer]
    }

    get gameState() {
        return TicTacToe.FLAGS[this.currentGameState]
    }

    get emptyFields() {
        return this.board.filter(v => v == TicTacToe.EMPTY).length
    }

    get setFields() {
        return this.board.filter(v => v != TicTacToe.EMPTY).length
    }

    ////////////////////////// Constructor

    constructor(initialArr, currentPlayer) {
        this.board = initialArr ?? Array(9).fill(TicTacToe.EMPTY)
        this.currentPlayer = currentPlayer ?? 0
        this.winner = null
        this.wins = 0 // A move can cause two rows to be set at once
        this.evalGameState()
    }

    ////////////////////////// Methods

    get(row, col) {
        return this.board[TicTacToe.getPosition(row, col)]
    }

    set(row, col) {

        if (this.get(row, col) != TicTacToe.EMPTY || this.gameState != 'MIDGAME')
            return false

        const move = TicTacToe.getPosition(row, col)
        this.board[move] = this.player
        this.currentPlayer = (this.currentPlayer + 1) % 2
        this.evalGameState()

        return true
    }

    evalGameState() {

        const wins = [0, 1, 2]
            .flatMap(idx => [
                // Vertical
                this.board.slice(idx * 3, (idx + 1) * 3),
                // Horizontal
                [this.board[idx], this.board[idx + 3], this.board[idx + 6]]
            ])
            .concat([
                // Diagonal
                [this.board[0], this.board[4], this.board[8]],
                [this.board[2], this.board[4], this.board[6]],
            ])
            .filter(section => !section.includes(TicTacToe.EMPTY))
            .filter(section =>
                section.filter(v => v == section[0]).length == 3
            )


        if (wins.length > 0) {
            this.wins = wins.length
            this.winner = wins.flat().pop()
            this.currentGameState = 2
        }
        else if (this.emptyFields == 0)
            this.currentGameState = 1
        else
            this.currentGameState = 0


        return this.gameState
    }

    // For Testing if works properly
    print() {
        return `Round ${this.setFields + 1}` + Helper.printMatrix(
            [
                this.board.slice(0, 3),
                this.board.slice(3, 6),
                this.board.slice(6, 9)
            ]
        );
    }
    // For Testing if works properly
    move(row, col) {

        console.log('\n///// Process Turn /////\n')

        console.log(`Set '${this.player}' at Row: ${row} Col: ${col}`)
        if (!this.set(row, col))
            console.log(`Move not Valid - Set '${this.player}' at Row: ${row} Col: ${col}`)

    }


    get nextStates() {
        return this.iteratorNextStates()
    }
    // Calculates all Valid Set of States for a given TicTacToe State (as a Generator Function)
    *iteratorNextStates() {

        for (let row = 1; row <= 3; row++) {
            for (let col = 1; col <= 3; col++) {

                const copy = this.copy
                if (copy.set(row, col))
                    yield copy

            }
        }

    }


}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



class BoardState {

    static REWARDS = {
        'LOSS': -1,
        'DRAW': 0,
        'WIN': 1
    }

    static BOARDSTATES = {}
    static boardStateFor(game) {
        // The the board can be arrived at as player 'X', or player 'O' Setting a field
        // In those cases different strategies need to be consiederd
        const addr = [game.board, game.player]
        if (!(addr in BoardState.BOARDSTATES))
            throw `Not Found ${addr}`

        return BoardState.BOARDSTATES[addr]
    }

    optimalMove(game) {
        const current = BoardState.boardStateFor(game)
        const prefered = current.preferedMove
        prefered.board.split('').map((v, i) => i)
            .filter(i => prefered.board[i] != current.board[i])
            .map(i => TicTacToe.getRowCol(i))
            .map(({ row, col }) => game.move(row, col))

    }

    constructor(maxDepth = -1, biasedPlayer = TicTacToe.PLAYERS[1], game) {

        this.biasedPlayer = biasedPlayer
        this.validSubboards = []

        // Initialize Empty Tic Tac Toe
        if (null == game)
            game = new TicTacToe()

        // The associated BoardState as a String
        this.board = game.board.join('')
        this.depth = game.setFields
        this.player = game.player
        this.state = game.gameState == 'WIN' && game.winner != biasedPlayer ? 'LOSS' : game.gameState
        this.preferedMove = this
        this.weight = BoardState.REWARDS[this.state]

        const addr = [game.board, game.player]
        BoardState.BOARDSTATES[addr] = this

        // Stop getting Subboards, when Game Ended or Max Depth reached
        if (game.gameState == 'MIDGAME' && (maxDepth == -1 || game.setFields < maxDepth)) {

            const isMaximizing = this.player == biasedPlayer
            this.weight = isMaximizing ? -Infinity : Infinity

            for (const next of game.nextStates) {

                const addr = [next.board, next.player]
                if (!(addr in BoardState.BOARDSTATES))
                    new BoardState(maxDepth, biasedPlayer, next)

                const boardState = BoardState.BOARDSTATES[addr]
                this.validSubboards.push(boardState)

                if (isMaximizing && boardState.weight > this.weight) {
                    this.weight = boardState.weight
                    this.preferedMove = boardState
                } else if (!isMaximizing && boardState.weight < this.weight) {
                    this.weight = boardState.weight
                    this.preferedMove = boardState
                }

            }
        }

        // Used for generating some stuff for Virtual Circuit board
        // 18 Bit address of current state (each two bits define wether X or O is set)
        // ( Bit 1 => First Row and Column is X, Bit 2 => First Row and Column is O, Bit 3 => First Row, Second Column is X, etc. )
        // (Concept now: 18 Bits for Addressing and 18 Bits as Output, most simple but not memory efficient, but can do optimistations later.)    
        this.BitAddress = game.board.map(v => {
            switch (v) {
                case TicTacToe.EMPTY: return '00'
                case TicTacToe.PLAYERS[0]: return '10'
                case TicTacToe.PLAYERS[1]: return '01'
            }
        }).join('')


        // Note for Future me: 
        //  - Can be Found by XORING this board-address bits with prefered board address bits
        //  - The single bit of difference between both is the move taken.
        this.preferedMoveBits =
            ((parseInt(this.BitAddress, 2) ^ parseInt(this.preferedMove.BitAddress), 2) | (0b1 << 19)).toString(2).substring(2)
    }

    *[Symbol.iterator]() {

        const hasVisited = {}

        // Simple queue using array.  
        //   Some random Note: -- More complex ones, can be for example --
        //    - Array with predefined length. Index for enqueue increments and loops around array, index for dequeue follows and wraps around too.
        //    - Object/hashtable. An index for Head and Tail incrementing on Queue and Dequeue and addressing the object in hashtable. Dequeue removes element from hashtable.
        //    - Using Nodes similar like a Linked List. Head points to start Node, Tail to last node. Queue move from Head to next Node. Dequeue appends next node to Tail.

        const queue = [null, this] // Null for marking next level of Depth
        while (queue.length > 1) {
            const boardState = queue.shift()

            if (null == boardState) {
                queue.push(null)
                continue
            }

            if (boardState.board in hasVisited)
                continue

            queue.push(...boardState.validSubboards)
            hasVisited[boardState.board] = true
            yield boardState
        }
    }



    // For testing
    printAllBoardStates_BreadthFirst() {

        let depth = -1
        for (const boardState of this) {
            if (boardState.depth != depth) {
                depth = boardState.depth
                console.log(`\nPrinting Unique BoardStates for Depth: ${boardState.depth}\n`)
            }
            console.log(`       ${boardState.board} ${boardState.BitAddress} ${boardState.preferedMoveBits} | Weight: ${boardState.weight} | Depth: ${boardState.depth} | ${boardState.player} ${boardState.state}`)
        }

    }

    // For testing
    get totalBoardStates() {
        return 1 + this.validSubboards.length + this.validSubboards.reduce((acc, board) => acc + board.totalBoardStates, 0)
    }

}

/////////////////////////////////////////////////////////////////////////////////////////
// Get Userinput to test everything
async function prompt(text, accepts, validSlice) {

    PROMPT:
    while (true) {

        const input = (await new Promise(resolve => readline.question(text, resolve))).trim()

        switch (accepts?.constructor) {
            case Array:
                if (accepts.flat().map(v => v.toUpperCase()).includes(input.toUpperCase())) {
                    if (Array != accepts[0].constructor) return input
                    return accepts[0].filter(v => v.toUpperCase() == input.toUpperCase()).length > 0 ? true : false
                }
                await prompt(`Input not Accepted. Valid Options: ${Helper.printArray(accepts)}`)
                continue PROMPT

            case Function:
                const { accepted, transformed, hint } = accepts(input)
                if (accepted) return transformed
                console.log('Input not valid!')
                await prompt(hint)
                continue PROMPT

            default:
                return input

        }
    }
}

async function promptPlayerMove(game) {

    // Prompt Player for Move
    return await prompt(`// Player '${game.player}' Turn: `, input => {
        const obj = {
            accepted: false,
            transformed: input,
            hint: 'Please Enter as space or comma seperated Row,Col like: \n' + "1,1 or 2,1 or 2 2, etc."
        }

        if (input.replace(/[\d,\s]/g, '').length != 0)
            return obj

        const move = input.split(/[,\s]+/)
            .map(v => parseInt(v))

        if (move.length != 2)
            return obj

        return {
            ...obj,
            transformed: { row: move[0], col: move[1] },
            accepted: true
        }
    })

}


async function mainLoop(game) {

    console.group()


    if (null != game) {
        await prompt('//')
        console.clear()
        console.log(game.print())
    }

    MAIN:
    while (true) {

        if (null == game || game.gameState != 'MIDGAME') {

            if (null != game) {
                const text = game.gameState == 'WIN' ? `Player '${game.winner}' has won the Game! ` : `The Game ended in a Draw`
                console.clear()
                console.log('/////  Game End  /////')
                console.log(text)
                console.log(game.print())
                await prompt('//')
            }

            console.log()
            if ((await prompt("Would you Like to start a new Game? (Y|N): ", [['Yes', 'Y'], ['No', 'N']]))) {
                console.clear()
                await prompt('\n// Starting New Game: ')
                game = new TicTacToe()
                console.clear()
                console.log('/////  New Game  /////')
                console.log(game.print())
            } else
                break MAIN

        }

        if (game.player == TicTacToe.PLAYERS[0]) {
            const move = await promptPlayerMove(game)
            console.clear()
            game.move(move.row, move.col)
        } else {
            await prompt(`// Player '${game.player}' moves...`)
            console.clear()
            tictactoeSolver.optimalMove(game)
        }

        console.log(game.print())
        await prompt('')
    }
    console.groupEnd()

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

// For testing
var game;

/*
game = new TicTacToe([
    'X', '#', '#',
    '#', '#', '#',
    '#', '#', '#'
], 1)
*/

console.clear()
console.log('')
console.log('Building Tree')
const tictactoeSolver = new BoardState(9, TicTacToe.PLAYERS[1], game)
console.log(`Amount of Unique calculated Boardstates: ${Object.keys(BoardState.BOARDSTATES).length}`)
mainLoop(game)