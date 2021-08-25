const Inout = new (require("../Inout"))("Daily Coding Problem --- Longest sequence of two elements");
const Helper = require("../Helper");

/*


    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    A girl is walking along an apple orchard with a bag in each hand. She likes to pick apples from each tree as she goes along, but is meticulous about not putting different kinds of apples in the same bag.

    Given an input describing the types of apples she will pass on her path, in order, determine the length of the longest portion of her path that consists of just two types of apple trees.

    For example, given the input [2, 1, 2, 3, 3, 1, 3, 5], the longest portion will involve types 1 and 3, with a length of four.

*/

Inout.output_stringConverter = arg => `Indexes: ${arg[0]} \nElements: ${arg[1]} \nLength: ${arg[2]}`
Inout.result_stringConverter = Inout.output_stringConverter;

Inout.push('&AR 2,1,2,3,3,1,3,5', '&AR 3,6|1,3|4');
Inout.push('&AR 2,1,2,2,2,1,2,1', '&AR 0,7|1,2|8');
Inout.push('&AR 5,4,3,2,1', '&AR 0,1|4,5|2');

Inout.push('&AR 1,2,1', '&AR 0,2|1,2|3');
Inout.push('&AR 0,1,2,2', '&AR 1,3|1,2|3');
Inout.push('&AR 1,2,3,2,2', '&AR 1,4|2,3|4');
Inout.push('&AR 3,3,3,1,2,1,1,2,3,3,4', '&AR 3,7|1,2|5');

Inout.solvers = [getLongestSequence]

Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*

    Time complexity: O(n) --- linary;
    Space complexity: O(1) --- constant;

*/

function getLongestSequence(arr) {

    // Points to sequence start.
    let seqStart = 0;

    // Points to first index of the currents element.
    let idxPrimary = 0;
    // Points to the first index of the element before primary.
    let idxSecondary = 0;

    // Whenever a value change is encountered, its index is stored in primary and
    // the value of primary is moved to secondary.

    // If both value, primary and secondary, differ from the current value, then a 
    // new sequence is started with its beginning index being set to the primary index
    // (The first index of the last differing value.)


    // Stores the start and endindex of the sequence with the maximum length.
    let maxElements = [];
    let maxSequence = [];
    let maxLength = 0;

    for (let i = 0; i <= arr.length; i++) {

        const current = arr[i];
        const primary = arr[idxPrimary];
        const secondary = arr[idxSecondary];

        if (current !== primary) {

            // When both differ a new sequence is found.
            if (current !== secondary)
                seqStart = idxPrimary

            // Move primary to secondary and current to primary index.
            idxSecondary = idxPrimary;
            idxPrimary = i;
        }
        // Optinal: don't evaluate length unless on Primary change or on array end.
        else if (i !== arr.length - 1)
            continue;


        // Evaluate sequence length from start to current element.
        // Because of the code running before, seqStart will always point to beginning of the correct sequence for the current index i.
        const currentLength = i - seqStart + 1;
        if (currentLength > maxLength) {
            maxLength = currentLength;
            maxSequence = [seqStart, i]
            maxElements = [arr[idxPrimary], arr[idxSecondary]]
        }
    }

    return [
        maxSequence.slice(0, 2),
        maxElements.sort(),
        [maxLength]
    ];
}