const fs = require('fs')
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
        'LOSS': -10,
        'DRAW': 0,
        'WIN': 10
    }

    static BOARDSTATES = {}
    static boardStateFor(game, biasedPlayer) {
        // The the board can be arrived at as player 'X', or player 'O' Setting a field
        // In those cases different strategies need to be consiederd
        const addr = [game.board, game.player, biasedPlayer]
        if (!(addr in BoardState.BOARDSTATES))
            throw `Not Found ${addr}`

        return BoardState.BOARDSTATES[addr]
    }

    optimalMove(game) {
        const current = BoardState.boardStateFor(game, this.biasedPlayer)
        const prefered = current.preferedMove
        prefered.board.split('').map((v, i) => i)
            .filter(i => prefered.board[i] != current.board[i])
            .map(i => TicTacToe.getRowCol(i))
            .map(({ row, col }) => game.move(row, col))

    }

    // Optimize and use depth in Calculation
    miniMax(depth = 1) {

        if (this.state == 'WIN')
            return BoardState.REWARDS.WIN * this.wins - depth
        else if (this.state == 'LOSS')
            return BoardState.REWARDS.LOSS * this.wins + depth
        else if (this.state == 'DRAW')
            return BoardState.REWARDS.DRAW

        if (this.validSubboards.length == 0)
            return 0

        const isMaximizing = this.player == this.biasedPlayer
        let weight = isMaximizing ? -Infinity : Infinity
        for (const { boardState } of this.validSubboards) {

            if (isMaximizing)
                weight = Math.max(weight, boardState.miniMax(depth + 1))
            else if (!isMaximizing)
                weight = Math.min(weight, boardState.miniMax(depth + 1))

        }

        return weight
    }

    constructor(maxboardDepth = -1, biasedPlayer = TicTacToe.PLAYERS[1], game) {

        this.biasedPlayer = biasedPlayer
        this.validSubboards = []
        this.preferedMove = this

        // Initialize Empty Tic Tac Toe
        if (null == game)
            game = new TicTacToe()

        // The associated BoardState as a String
        this.board = game.board.join('')
        this.boardDepth = game.setFields
        this.player = game.player
        this.state = game.gameState
        if (this.state == 'WIN') {
            this.wins = game.wins
            if (game.winner == biasedPlayer)
                this.state = 'WIN'
            else
                this.state = 'LOSS'
        }

        const addr = [game.board, game.player, biasedPlayer]
        BoardState.BOARDSTATES[addr] = this

        // Stop getting Subboards, when Game Ended or Max boardDepth reached
        if (game.gameState == 'MIDGAME' && (maxboardDepth == -1 || game.setFields < maxboardDepth)) {

            for (const next of game.nextStates) {

                const addr = [next.board, next.player, biasedPlayer]
                if (!(addr in BoardState.BOARDSTATES))
                    new BoardState(maxboardDepth, biasedPlayer, next)

                const boardState = BoardState.BOARDSTATES[addr]
                this.validSubboards.push({
                    boardState: boardState,
                    weight: boardState.miniMax()
                })
            }

            this.validSubboards.sort((a, b) => b.weight - a.weight)
            this.preferedMove = this.validSubboards[0].boardState
        }

        // Used for generating some stuff for Virtual Circuit board
        // 18 Bit address of current state (each two bits define wether X or O is set)
        // ( Bit 1 => First Row and Column is X, Bit 2 => First Row and Column is O, Bit 3 => First Row, Second Column is X, etc. )
        // (Concept now: 18 Bits for Addressing and 9 Bits as Output, most simple but not memory efficient, but can do optimistations later.)    
        this.BitAddress = game.board.map(v => {
            switch (v) {
                case TicTacToe.EMPTY: return '00'
                case TicTacToe.PLAYERS[0]: return '10'
                case TicTacToe.PLAYERS[1]: return '01'
            }
        }).join('')


        //  XOR this and prefered Board Bits
        this.preferedMoveBits =
            ((parseInt(this.BitAddress, 2) ^ parseInt(this.preferedMove.BitAddress, 2)) | (0b1 << 19))
                .toString(2).substring(2).split('')
                // Convoluted thing that gives me the output I need (hopefully)
                .map(v => parseInt(v)).map((v, idx, arr) => arr.slice(idx, idx + 2))
                .filter((v, i) => i % 2 == 0).map(v => v.includes(1) ? 1 : 0).join('')
    }


    *[Symbol.iterator]() {

        const hasVisited = {}

        // Simple queue using array.  
        //   Some random Note: -- More complex ones, can be for example --
        //    - Array with predefined length. Index for enqueue increments and loops around array, index for dequeue follows and wraps around too.
        //    - Object/hashtable. An index for Head and Tail incrementing on Queue and Dequeue and addressing the object in hashtable. Dequeue removes element from hashtable.
        //    - Using Nodes similar like a Linked List. Head points to start Node, Tail to last node. Queue move from Head to next Node. Dequeue appends next node to Tail.

        const queue = [null, this] // Null for marking next level of boardDepth
        while (queue.length > 1) {
            const boardState = queue.shift()

            if (null == boardState) {
                queue.push(null)
                continue
            }

            if (boardState.board in hasVisited)
                continue

            queue.push(...boardState.validSubboards.map(v => v.boardState))
            hasVisited[boardState.board] = true

            yield boardState
        }
    }



    // For testing
    printAllBoardStates_BreadthFirst() {

        let boardDepth = -1
        for (const boardState of this) {
            if (boardState.boardDepth != boardDepth) {
                boardDepth = boardState.boardDepth
                console.log(`\nPrinting Unique BoardStates for boardDepth: ${boardState.boardDepth}\n`)
            }
            console.log(`       ${boardState.board} ${boardState.BitAddress} ${boardState.preferedMoveBits} | Weight: ${boardState.weight} | boardDepth: ${boardState.boardDepth} | ${boardState.player} ${boardState.state}`)
        }

    }

    // Needed for VCB
    * printVCBPointersToboardDepth(boardDepth = 2, hex = false) {

        for (const boardState of this) {

            if (boardState.boardDepth > boardDepth)
                return

            //NOTE Virtual Circuit Board Limitation => Pointer can't be at address 0x0
            // Doesn't matter since in my Virtual Circuit Board Game, Player 'O' always starts second and state can therefore never be reached
            if (boardState.boardDepth == 0 && boardState.biasedPlayer == TicTacToe.PLAYERS[1])
                continue

            //NOTE: In my Virtual Circuit Board Implementation only the moves where the current biased player can take are needed
            // And Player 1 is always 'X' whereas Player 2 is always 'O'
            if (boardState.biasedPlayer != boardState.player)
                continue

            // Label for identifing pointer in VCB: opt_<boardDepth>_<maximizingPlayer>_board
            let name = `opt_${boardState.boardDepth}__bias_${boardState.biasedPlayer}_player${boardState.player}__${boardState.board.replace(/#/g, 'E')}_${this.state.substring(0,3)}_TO_${boardState.preferedMove.board.replace(/#/g, 'E')}_${boardState.preferedMove.state.substring(0,3)}${boardState.preferedMove.wins ?? 0}`
            let addr = boardState.BitAddress
            let move = boardState.preferedMoveBits
            let biasBit = boardState.biasedPlayer == TicTacToe.PLAYERS[0] ? 1 : 0 // When Player 'O' highest bit is Zero and vice Versa

            if (hex) {
                addr = `0x${parseInt(`${biasBit}${addr}`, 2).toString(16)}`
            }
            else
                addr = `0b${biasBit}${addr}`

            yield `pointer ${name} ${addr} 0b${move}`
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

    console.clear()
    console.log('')
    console.log('Building Tree')
    const tictactoeSolver = new BoardState(9, TicTacToe.PLAYERS[1], game)
    console.log(`Amount of Unique calculated Boardstates: ${Object.keys(BoardState.BOARDSTATES).length}`)

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

function getOutputForVCB() {
    const filename = `${__dirname}/virtualCircuitBoard_mem.txt`
    fs.writeFileSync(filename, '') // Overwrite file with nothing

    // Create Writestream to append each iteration
    const stream = fs.createWriteStream(filename, { flags: 'a' });

    stream.write('\n')
    stream.write(`# Memory Addresses for all games player with bias to Player: 'O'\n`)
    stream.write('\n')
    // bias Player 'O'
    tictactoeSolver = new BoardState(9, TicTacToe.PLAYERS[1])
    for (const vcb_output of tictactoeSolver.printVCBPointersToboardDepth(9, false)) {
        console.log(vcb_output)
        stream.write(vcb_output + '\n')
    }

    stream.write('\n')
    stream.write(`# Memory Addresses for all games player with bias to Player: 'X'\n`)
    stream.write('\n')
    // bias Player 'X'
    tictactoeSolver = new BoardState(9, TicTacToe.PLAYERS[0])
    for (const vcb_output of tictactoeSolver.printVCBPointersToboardDepth(9, false)) {
        console.log(vcb_output)
        stream.write(vcb_output + '\n')
    }

    stream.end();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

getOutputForVCB()
mainLoop()