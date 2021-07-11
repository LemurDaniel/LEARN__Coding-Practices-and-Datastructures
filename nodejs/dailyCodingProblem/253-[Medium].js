const Helper = require("../Helper");

const Inout = new (require("../Inout"))("Daily Coding Problem --- Zigzag form");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by PayPal.

    Given a string and a number of lines k, print the string in zigzag form. 
    In zigzag, characters are printed out diagonally from top left to bottom right until reaching the kth line, then back up to top right, and so on.

    For example, given the sentence "thisisazigzag" and k = 4, you should print:

    t     a     g
     h   s z   a
      i i   i z
       s     g

*/

Inout.push({ k: 4, str: 'thisisazigzag' }, () => true);
Inout.solvers = [printZigZag];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function printZigZag(str, k) {

    const result = new Array(k).fill('').map(v => []);

    let direction = 1;
    let currRow = 0;

    for (const currChar of str) {

        for (let row = 0; row < result.length; row++) {
            if (row === currRow)
                result[row].push(currChar);
            else
                result[row].push(' ');
        }

        currRow += direction;
        if (currRow === 0)
            direction = 1;
        else if (currRow === k - 1)
            direction = -1;
    }

    return {
        matrix: result,
        string: result.map(v => v.join('')).join('\n ')
    }
}