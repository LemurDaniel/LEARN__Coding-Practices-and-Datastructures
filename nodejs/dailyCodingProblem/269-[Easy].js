const Inout = new (require("../Inout"))("Daily Coding Problem --- Fallen Dominos");
const { CustomError } = require("../Helper");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Microsoft.

    You are given an string representing the initial conditions of some dominoes. Each element can take one of three values:

    L, meaning the domino has just been pushed to the left,
    R, meaning the domino has just been pushed to the right, or
    ., meaning the domino is standing still.
    Determine the orientation of each tile when the dominoes stop falling. Note that if a domino receives a force from the left and right side simultaneously, it will remain upright.

    For example, given the string .L.R....L, you should return LL.RRRLLL.

    Given the string ..R...L.L, you should return ..RR.LLLL.

*/


Inout.result_Equals = (oup, res) => {
    if (typeof res === 'object') res = res.string;
    return typeof res === 'string' && oup.toLowerCase() === res.toLowerCase();
}

Inout.push('...R.L...', '...R.L...')
Inout.push('..LR.L...', 'LLLR.L...')
Inout.push('R.......L', 'RRRR.LLLL')
Inout.push('R......L.', 'RRRRLLLL.')
Inout.push('R..R..R.L', 'RRRRRRR.L')
Inout.push('RR.R....L', 'RRRRRRLLL')
Inout.push('RR.RR...L', 'RRRRRR.LL')
Inout.push('.L.R....L', 'LL.RRRLLL')
Inout.push('..R...L.L', '..RR.LLLL')

Array.prototype.peek = function () { return this[this.length - 1] }

Inout.solvers = [fallenDominos_severalPasses, fallenDominos_ArrayTwoPasses, fallenDominos_IndexArray]
Inout.solve(1);

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


// Each timestep a domino can another one to fall.
// Every timestep the new state of dominos is calculated until no further change happens, which will be returned as the final state.
function fallenDominos_severalPasses(str) {

    let dominos = str.split('');
    let dominoFell = true;

    while (dominoFell) {


        dominoFell = false;
        let temp = [];

        for (let i = 0; i < dominos.length; i++) {
            let curr = dominos[i];
            let prev = dominos[i - 1] ?? '.';
            let next = dominos[i + 1] ?? '.';

            if (curr === '.') {
                if (prev === 'R' && next !== 'L') {
                    curr = 'R';
                    dominoFell = true;
                } else if (next === 'L' && prev !== 'R') {
                    curr = 'L';
                    dominoFell = true;
                }
            }
            temp.push(curr);
        }

        dominos = temp;
    }

    return dominos.join('');
}


// It takes to passes from left handling the R direction and from right to left handling the L direction.
// The hopper hops two place for each one domino and therefore detects the middle in a RL sequence.
function fallenDominos_ArrayTwoPasses(str) {

    str = '//' + str + '//';
    const len = str.length;
    const dominos = str.split('');

    for (let i = 0, hopper = 0; i < len; i++) {

        if (str[i] !== 'R') continue;

        do {
            if (str[i] === 'R')
                hopper = i;

            hopper += 2;
            dominos[i++] = 'R';
        }
        while (hopper < len &&
        str[hopper - 1] !== 'L' && str[hopper] !== 'L')

    }

    for (let i = len - 1, hopper = i; i >= 0; i--) {

        if (str[i] !== 'L') continue;

        do {
            if (str[i] === 'L')
                hopper = i;

            hopper -= 2;
            dominos[i--] = 'L';
        }
        while (hopper >= 0 &&
        str[hopper + 1] !== 'R' && str[hopper] !== 'R')
    }

    return dominos.splice(2, len - 4).join('');
}





function fallenDominos_IndexArray(str) {

    // Contains all ending indexes of a sequence with their respective domino fall direction.
    // For example { idx: 3, dom: R } means that all from 0 up to index 3 fall to the right, the next sequence { idx: 7, dom: L } means that all dominos from now index 4 to 7 fall to the left.
    const temp = [[-1, -1]];

    for (let i = 0; i < str.length; i++) {

        const [, domLast] = temp.peek()

        if (domLast === str[i]) temp.pop();

        temp.push([i, str[i]]);
    }


    const indexes = [];

    for (let index = 1; index < temp.length; index++) {

        const val = temp[index];
        const [idx, dom] = val;
        const [idxLast, domLast] = indexes.length > 0 ? indexes.peek() : [-1, -1];


        // Add or remove standing dominos, depending on wheter the have fallen to the right or not.
        if (dom === '.') {
            if (domLast !== 'R')
                indexes.push(val);
            continue;
        }

        // Remove dominos that have fallen to the left.
        if (domLast === '.' && dom === 'L') {
            index--;
            indexes.pop()
            continue;
        }


        // Remove consecutive duplicate entries.
        if (domLast === dom) indexes.pop();

        // Take care of dominos falling in each others direction.
        else if (domLast === 'R' && dom === 'L') {

            let len = idx - idxLast - 1;
            let mid = idxLast + Math.floor(len / 2);

            // Update last index of domino falling in the right direction.
            indexes.peek()[0] = mid;
            if (len % 2 !== 0)
                indexes.push([++mid, '.'])
        }

        // Push the domino index and falling direction to the array.
        indexes.push(val)
    }


    // Build the resulting sequence out ot the index array.
    const result = [];

    let index = -1;
    for (const [endIdx, dom] of indexes) {

        do {
            result.push(dom);
        } while (++index < endIdx);
    }


    return {
        indexes: indexes,
        result: result,
        string: result.join('')
    }

}