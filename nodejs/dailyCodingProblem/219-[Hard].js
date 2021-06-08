const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview nproblem for today.

    This problem was asked by Salesforce.

    Connect 4 is a game where opponents take turns dropping red or black discs into a 7 x 6 vertically suspended grid. The game ends either when one player creates a line of four consecutive discs of their color (horizontally, vertically, or diagonally), or when there are no more spots left in the grid.

    Design and implement Connect 4.

*/


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

class Connect_Four {

    static EMPTY = '_'
    static GAME_ON   = 0;
    static GAME_OVER = 1;
    static GAME_DRAW = 2;
    static MAX_TURNS = 7*6; 

    static rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });



    constructor(){
        this.initialize();
    }

    initialize() {
        this.game_state = Connect_Four.GAME_ON;

        this.curr_player = 0;
        this.counted_turns = 0;
        this.players = ['O', 'X'];

        this.board = [];
        for(let i=0; i<7; i++) this.board.push(new Array(6).fill(Connect_Four.EMPTY));

        console.clear();
        this.main_loop();
    }


    main_loop() {


        if(this.game_state == Connect_Four.GAME_ON) {

            console.log('\n     Player: ' + this.players[this.curr_player] + '  --- Turn: ' + this.counted_turns+'/'+Connect_Four.MAX_TURNS)
            console.log(Helper.matrix_toString(this.board, false));

            Connect_Four.rl.question('Choose a Row: ', (userInput) => {
                Connect_Four.rl.close;
                console.clear();

                try {

                    const num = parseInt(userInput.trim());
                    if(Number.isNaN(num)) throw "\n     '"+userInput+"' is not a valid number."
                    if(num < 1 || num > 7) throw "\n    '"+num+"'is Out of Range (1-7)."
                
                    const pos = this.apply_move(num-1);
                    this.check_for_win(pos);
                    if(this.game_state == Connect_Four.GAME_ON) 
                        this.curr_player = this.curr_player == 0 ? 1 : 0;

                } catch(exp) {
                    console.log(exp)
                }

                this.main_loop();
            });

        } 
        
        else if(this.game_state == Connect_Four.GAME_DRAW) {

            console.clear();
            console.log('\n     The game is a draw --- Turn: ' + this.counted_turns+'/'+Connect_Four.MAX_TURNS)
            console.log(Helper.matrix_toString(this.board, false));
            
            Connect_Four.rl.question('/// Enter to play again.', (userInput) => {
                Connect_Four.rl.close;
                this.initialize();
            });

        } 

        else {

            const display_win = [];
            for(let i=0; i<7; i++) display_win.push(this.board[i].map( v => v == Connect_Four.EMPTY ? Connect_Four.EMPTY : '#' ));
            const start = { col: this.connected[0].col, row: this.connected[0].row };
            const end   = { col: this.connected[1].col, row: this.connected[1].row };

            while( start.col != end.col || start.row != end.row ) {
                display_win[start.col][start.row] = this.players[this.curr_player];
                if(start.col < end.col) start.col++;
                else if(start.col > end.col) start.col--;
                if(start.row < end.row) start.row++;
                else if(start.row > end.row) start.row--;
            } 
            display_win[end.col][end.row] = this.players[this.curr_player];
            
            console.clear();
            console.log('\n     Player: ' + this.players[this.curr_player] + ' has won the game --- Turn: ' + this.counted_turns+'/'+Connect_Four.MAX_TURNS)
            console.log(Helper.matrix_toString(this.board, false));
            console.log(Helper.matrix_toString(display_win, false))

            Connect_Four.rl.question('/// Enter to play again.', (userInput) => {
                Connect_Four.rl.close;
                this.initialize();
            });

        }
    }


    apply_move(num) {

        const column = this.board[num];

        for(let i=0; i<column.length; i++){
            if(column[i] != Connect_Four.EMPTY) continue;
            column[i] = this.players[this.curr_player];
            this.counted_turns++;
            return { col: num, row: i };
        }

        throw 'Column ' + num + ' is filled. Choose another column.'
    }

    check_for_win(pos) {

        /*

        Rows get printed as columns. Left to right is vertical.
        Columns get printed as rows. Up to down is horizontal.
        [
        [ '_', '_', '_', '_', '_', '_' ], 
        [ '_', '_', '_', '_', '_', '_' ],  
        [ 'O', '_', '_', '_', '_', '_' ],
        [ '_', '_', '_', '_', '_', '_' ],
        [ '_', '_', '_', '_', '_', '_' ],
        [ '_', '_', '_', '_', '_', '_' ],
        [ '_', '_', '_', '_', '_', '_' ]
        ]

    */

        const board = this.board;
        const player = this.players[this.curr_player];

        // Check vertical. 
        let row_up = pos.row;
        let row_down = pos.row;
        let vertical_count = 1;
        let column = board[pos.col];

        while(++row_up < column.length && column[row_up] == player) vertical_count++;
        while(--row_down >= 0 && column[row_down] == player) vertical_count++;
        
        // (Vertical can maximally be four. Horizontal and diagonal can be four or more)
        if(vertical_count == 4) {
            this.game_state = Connect_Four.GAME_OVER;
            this.connected = [ { col: pos.col, row: row_up-1 },  { col: pos.col, row: row_down+1 }];
            return;
        }

        // Check horizontal.
        let col_left  = pos.col;
        let col_right = pos.col;
        let horizontal_count = 1;

        while(++col_right < board.length && board[col_right][pos.row] == player) horizontal_count++;
        while(--col_left >= 0 && board[col_left][pos.row] == player) horizontal_count++;

        if(horizontal_count >= 4) {
            this.game_state = Connect_Four.GAME_OVER;
            this.connected = [ { col: col_left+1, row: pos.row },  { col: col_right-1, row: pos.row }];
            return;
        }

        // Check diagonal left/down to right/up.
        col_left = pos.col-1;
        col_right = pos.col+1;
        row_up = pos.row+1;
        row_down = pos.row-1;
        let diagonal_count = 1;

        while(col_right < board.length && row_up < board[col_right].length && board[col_right][row_up] == player) {
            diagonal_count++;
            col_right++;
            row_up++;
        }
        while(col_left >= 0 && row_down >= 0 && board[col_left][row_down] == player) {
            diagonal_count++;
            col_left--;
            row_down--;
        }

        if(diagonal_count >= 4) {
            this.game_state = Connect_Four.GAME_OVER;
            this.connected = [ { col: col_left+1, row: row_down+1 },  { col: col_right-1, row: row_up-1 }];
            return;
        }


        // Check diagonal left/up to right/down.
        col_left = pos.col-1;
        col_right = pos.col+1;
        row_up = pos.row+1;
        row_down = pos.row-1;
        diagonal_count = 1;
   
        while(col_right < board.length && row_down >= 0 && board[col_right][row_down] == player) {
            diagonal_count++;
            row_down--;
            col_right++;
        }
        while(col_left >= 0 && row_up < board[col_left].length && board[col_left][row_up] == player) {
            diagonal_count++;
            row_up++;
            col_left--;
        }
   
        if(diagonal_count >= 4) {
            this.game_state = Connect_Four.GAME_OVER;
            this.connected = [ { col: col_left+1, row: row_up-1 },  { col: col_right-1, row: row_down+1 }];
            return;
        }


        if(this.counted_turns == Connect_Four.MAX_TURNS) this.game_state = Connect_Four.GAME_DRAW;
    }
}


const c = new Connect_Four();