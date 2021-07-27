const Inout = new (require("../Inout"))("Daily Coding Problem --- Check wheter King is checked");
const { CustomError } = require("../Helper");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Oracle.

    You are presented with an 8 by 8 matrix representing the positions of pieces on a chess board. 
    The only pieces on the board are the black king and various white pieces. 
    Given this matrix, determine whether the king is in check.

    For details on how each piece moves, see here.

    For example, given the following matrix:

    ...K....
    ........
    .B......
    ......P.
    .......R
    ..N.....
    ........
    .....Q..
    You should return True, since the bishop is attacking the king diagonally.


    NOTE
 
     Double check is possible.

     One piece must move to deliver a check, while simultaneously allowing another piece to give check that had been blocked by the moving piece.

     Examples:

         - a rook could move on the rank to check on a file while uncovering a bishop check
         - a knight could move to give check while uncovering a rook check or a bishop check

*/

const PIECES = {
    Empty: '-',
    King: 'K',
    Rook: 'R',
    Pawn: 'P',
    Queen: 'Q',
    Knight: 'N',
    Bishop: 'B',
}

Inout.input_stringConverter = arg => Helper.printMatrix(arg, true, 2);
Inout.input_Converter = arg => Helper.string_toIntArray(arg.replaceAll('.', PIECES.Empty))

Inout.result_stringConverter = arg => arg[1];
Inout.result_Equals = (arg, arg2) => arg === arg2[0];

Inout.push(
    '. . . K . . . .|' +
    '. . . . . . . .|' +
    '. . . . N . . .|' +
    '. . . . . . P .|' +
    '. . . . . . . R|' +
    '. . N . . . . .|' +
    '. . . . . . . .|' +
    '. . . . . Q . .',
    true
)

Inout.push(
    '. . . K . . . .|' +
    '. . . . . . . .|' +
    '. B . . . . . .|' +
    '. . . . . . P .|' +
    '. . . . . . . R|' +
    '. . N . . . . .|' +
    '. . . . . . . .|' +
    '. . . . . Q . .',
    true
)

Inout.push(
    '. . . K . . . .|' +
    '. . . . . . . .|' +
    '. . . . . . . .|' +
    '. . . R . . P .|' +
    '. . . . . . . R|' +
    '. . N . . . . .|' +
    '. . . . . . . .|' +
    '. . . . . Q . .',
    true
)

Inout.push(
    '. . . K . . . .|' +
    '. . . . P . . .|' +
    '. . . . . . . .|' +
    '. . . . . . P .|' +
    '. . . . . . . R|' +
    '. . N . . . . .|' +
    '. . . . . . . .|' +
    '. . . . . Q . .',
    true
)

Inout.push(
    '. . . K . . . .|' +
    '. . . . . . . .|' +
    '. . . . . . . .|' +
    'Q . . . . . P .|' +
    '. . . . . . . R|' +
    '. . N . . . . .|' +
    '. . . . . . . .|' +
    '. . . . . . . .',
    true
)

Inout.push(
    '. . . K . . . .|' +
    '. . . . . . . .|' +
    '. . . . . . . .|' +
    '. . . . . . P .|' +
    '. . . . . . . R|' +
    '. . N . . . . .|' +
    '. . . . . . . .|' +
    '. . . . . . . .',
    false
)

Inout.push(
    '. . . . . . . .|' +
    '. . . . N . . .|' +
    '. . . . . . . .|' +
    '. . . K . . P .|' +
    '. . . . . . . R|' +
    '. . . . . . . .|' +
    '. . . . . . . .|' +
    '. . . . . . . .',
    true
)

const Vector = initialize();

Inout.solvers = [isKingChecked, isKingChecked_Vectors]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/



function getPosOf(piece, board) {

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {

            if (board[row][col] === piece)
                return [row, col];

        }
    }
}

function doesPieceCheck(piece, radians, distance) {

    const angle = Math.round(radians / 2 / Math.PI * 360);

    switch (piece) {

        // All the valid angles of the Knight attacking on a distance of two.
        case PIECES.Knight:
            return [27, 63, 117, 153, 207, 243, 297, 333].includes(angle) && distance === 2;

        // Pawns can only capture vertically one distance of one square.
        case PIECES.Pawn:
            return distance === 1 && (angle === 45 || angle === 135);

        // Bishop can only capture vertically on any distance.
        case PIECES.Bishop:
            return angle % 45 === 0 && angle % 90 !== 0;

        // Rook can capture horizontally or vertically on any distance.
        case PIECES.Rook:
            return angle % 90 === 0;

        // Queens can capture vertically, horizontally and diagonally on any distance.
        case PIECES.Queen:
            return angle % 45 === 0;


        default:
            throw new CustomError('Not a Valid piece', piece);

    }
}

function isKingChecked(board) {

    // All angles for the movement of the knight.
    const directions = [27, 63, 117, 153, 207, 243, 297, 333].
        map(d => (d / 180) * Math.PI);

    // All angles for horizontal, vertical and diagonal movement.
    for (let rad = 0; rad < Math.PI * 2; rad += Math.PI / 4) {
        directions.push(rad);
    }

    // Call helper method for the postion of the king and destructure result.
    const [rowKing, colKing] = getPosOf(PIECES.King, board);

    // Check on all directions of the King for a piece that checks him.
    for (const radians of directions) {

        // Move along the current direction until the end of board or a piece is encountered.
        let distance = 0;
        let outOfBounds = false;
        let pieceEncountered = false;
        while (!outOfBounds && !pieceEncountered) {

            distance++;
            const colPiece =
                Math.round(Math.cos(radians) * distance) + colKing;
            const rowPiece =
                Math.round(Math.sin(radians) * distance) + rowKing; // negative distance to invert y-axis.


            outOfBounds =
                rowPiece < 0 || rowPiece >= board.length ||
                colPiece < 0 || colPiece >= board[0].length;

            // Continue if the position is out of bounds.
            if (outOfBounds) continue;

            // Get the piece on the current position.
            const piece = board[rowPiece][colPiece];
            if (piece === PIECES.Empty) continue;
            else pieceEncountered = true;

            if (!doesPieceCheck(piece, radians, distance)) continue;

            // Return position and pice that checks the King.
            const posPiece = String.fromCharCode(65 + colPiece) + (8 - rowPiece);
            const posKing = String.fromCharCode(65 + colKing) + (8 - rowKing);
            const pieceName = Object.keys(PIECES).filter(v => PIECES[v] === piece);

            return [true, `King on ${posKing} is checked by ${pieceName} on ${posPiece}.`];
        }

    }

    return [false, 'King is not checked by and piece.'];
}





function isKingChecked_Vectors(board) {

    // Get the positions of all pieces and the king.
    let colKing;
    let rowKing;
    const posPieces = [];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {

            const piece = board[row][col];
            if (piece === PIECES.King)
                [rowKing, colKing] = [row, col];
            else if (piece !== PIECES.Empty)
                posPieces.push(new Vector(row, col));
        }
    }

    // Map the positions to angles and only consider the closets ones.
    const anglesAroundKing = {};

    for (const posPiece of posPieces) {

        const vectorFromKing = posPiece.sub(rowKing, colKing);
        const heading = Math.round(vectorFromKing.heading / 2 / Math.PI * 360);

        // Only consider the pieces with the least distance.
        if (heading in anglesAroundKing) {
            const dist1 = anglesAroundKing[heading].mag;
            const dist2 = posPiece.mag;
            if (dist1 < dist2) continue;
        }

        anglesAroundKing[heading] = vectorFromKing;
    };

    for (const vectorFromKing of Object.values(anglesAroundKing)) {

        const [rad, mag] = vectorFromKing.polar;
        const [rowPiece, colPiece] = vectorFromKing.add(rowKing, colKing);
        const piece = board[rowPiece][colPiece];

        if (!doesPieceCheck(piece, rad, mag)) continue;

        // Return position and piece that checks the King.
        const piecePos = String.fromCharCode(65 + colPiece) + (8 - rowPiece);
        const KingPos = String.fromCharCode(65 + colKing) + (8 - rowKing);
        const pieceName = Object.keys(PIECES).filter(v => PIECES[v] === piece);

        return [true, `King on ${KingPos} is checked by ${pieceName} on ${piecePos}.`];
    }

    return [false, 'King is not checked by and piece.'];

}



function initialize() {
    return class Vector extends Array {

        get mag() {
            const [row, col] = this;
            return Math.round(
                Math.sqrt(row * row + col * col)
            );
        }

        get heading() {
            const [row, col] = this;

            // Can't divide by null.
            if (col === 0)
                return row > 0 ? Math.PI / 2 : Math.PI * 3 / 2;

            const TAU = Math.PI * 2;
            if (col > 0)
                return (TAU + Math.atan(col / row)) % TAU;
            else
                return Math.PI + Math.atan(col / row);
        }

        get polar() {
            return [this.heading, this.mag];
        }

        constructor(row, col) {
            super(2);
            this[0] = row ?? 0;
            this[1] = col ?? 0;
        }

        add(row, col) {
            this[0] += row;
            this[1] += col;
            return this;
        }

        sub(row, col) {
            this[0] -= row;
            this[1] -= col;
            return this;
        }
    }
}