const Helper = require("../Helper");

class TicTacToe {

    ////////////////////////// Static

    static EMPTY = '#'
    static PLAYERS = ['X', 'O']
    static FLAGS = ['MIDGAME', 'DRAW', 'WIN']

    // Functions to Convert Row,Col to Array-Position and Back
    static getPosition = (row, col) => (row - 1) * 3 + (col - 1)
    static getRowCol = pos => ({
        col: (pos % 3 + 1),
        row: Math.floor(pos / 3)
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
        this.currentPlayer = currentPlayer ?? 0;
        this.evalGameState()
    }

    ////////////////////////// Methods

    get(row, col) {
        return this.board[TicTacToe.getPosition(row, col)]
    }

    set(row, col) {

        if (this.get(row, col) != TicTacToe.EMPTY || this.gameState != 'MIDGAME')
            return false

        this.board[TicTacToe.getPosition(row, col)] = this.player

        // Don't change Player when Game has ended in a WIN or DRAW, so when win is set, winner is current Player.
        if (this.evalGameState() == 'MIDGAME')
            this.currentPlayer = (this.currentPlayer + 1) % 2

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
            .filter(section => section.filter(v => v == section[0]).length == 3)

        if (wins.length > 1) {
            console.log(this)
            throw "shit shouldn't happen"
        }
        else if (wins.length == 1)
            this.currentGameState = 2
        else if (this.emptyFields == 0)
            this.currentGameState = 1
        else
            this.currentGameState = 0

        return this.gameState
    }


    // For Testing if works properly
    print() {
        return `${this.gameState} \n` + Helper.printMatrix(
            [
                this.board.slice(0, 3),
                this.board.slice(3, 6),
                this.board.slice(6, 9)
            ]
        );
    }
    // For Testing if works properly
    move(row, col) {

        console.log(this.print())

        console.log(`Set ${this.player} at Row: ${row} Col: ${col}`)
        if (!this.set(row, col))
            console.log(`Move not Valid - Set ${this.player} at Row: ${row} Col: ${col}`)

        console.log(this.print())

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
        'MIDGAME': 0,
        'LOSS': 0,
        'DRAW': 1,
        'WIN': 2
    }

    constructor(maxDepth = -1, player = TicTacToe.PLAYERS[0], game) {

        this.validSubboards = []


        // Initialize Empty Tic Tac Toe
        if (null == game)
            game = new TicTacToe()

        // The associated BoardState as a String
        this.board = game.board.join('')
        this.depth = game.setFields
        this.player = player

        if (game.gameState == 'WIN')
            this.state = game.player == player ? 'WIN' : 'LOSS'
        else
            this.state = game.gameState


        // Used for generating some stuff for Virtual Circuit board
        // 18 Bit address of current state (each two bits define wether X or O is set)
        // ( Bit 1 => First Row and Column is X, Bit 2 => First Row and Column is O, Bit 3 => First Row, Second Column is X, etc. )
        // (Concept now: 18 Bits for Addressing and 18 Bits as Output, most simple but not memory efficient, but can do optimistations later.)    
        this.BitAddress = game.board.map(v => v == TicTacToe.PLAYERS[0] ? '10' : '01').join('')



        // Stop getting Subboards, when Game Ended or Max Depth reached
        if (game.gameState != 'MIDGAME' || (maxDepth != -1 && game.setFields >= maxDepth)) {
            return
        }


        // Consider all next board states for the current one
        for (const next of game.nextStates) {

            this.validSubboards.push(
                new BoardState(maxDepth, player, next)
            )

        }

        // The prefered Move for implementing in Virtual Circuit Board with memory pointers
        this.preferedMove = '[Not Implemented Yet]'

        // Note for Future me: 
        //  - Can be Found by XORING this board-address bits with prefered board address bits
        //  - The single bit of difference between both is the move taken.
        this.preferedMoveBits = '010101010101010101'
    }

    // Wrapper to just return the iterator of the validSuboards property of the current object
    [Symbol.iterator]() {
        return this.validSubboards[Symbol.iterator]()
    }


    // For testing
    printAllBoardStates() {

        for (const boardState of this) {
            console.log(` ${boardState.board} ${boardState.BitAddress} | Depth: ${boardState.depth} | ${boardState.player} ${boardState.state}`)
            boardState.printAllBoardStates()
        }

    }

    // For testing
    printAllBoardStates_BreadthFirst() {

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
                console.log(`\nPrinting Unique BoardStates for Depth: ${queue[0].depth}\n`)
                queue.push(null)
                continue
            }

            if (boardState.board in hasVisited)
                continue

            queue.push(...boardState.validSubboards)
            hasVisited[boardState.board] = true
            console.log(`       ${boardState.board} ${boardState.BitAddress} | Depth: ${boardState.depth} | ${boardState.player} ${boardState.state}`)
        }

    }

    // For testing
    get totalBoardStates() {
        return 1 + this.validSubboards.length + this.validSubboards.reduce((acc, board) => acc + board.totalBoardStates, 0)
    }

    uniqueBoardStates(states = {}) {

        if (this.board in states)
            states[this.board]++
        else
            states[this.board] = 1

        for (const board of this) {
            board.uniqueBoardStates(states)
        }

        return states
    }
}


const root = new BoardState(3)
root.printAllBoardStates_BreadthFirst()

console.log(`\nNumber of total Board States calculated: ${root.totalBoardStates}`)

// NOTE: 
//    A Number of 5,478 valid boards can be found online and is true.
//    This one above is bigger, since it calculates the progression, meaning there are several paths, that will lead to the same board state
console.log(`Number of actually unique Board States: ${Object.keys(root.uniqueBoardStates()).length}\n`)
// NOTE for Future me
//    The Tree can be optimised by merging Paths that lead to the same Boardstates
//    Since any subsequent calculations should only be made once instead of multiple times