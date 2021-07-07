const Inout = new (require('../Inout'))('Daily Coding Problem --- Apply Permutation');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Twitter.

    A permutation can be specified by an array P, where P[i] represents the location of the element at i in the permutation. 
    For example, [2, 1, 0] represents the permutation where elements at the index 0 and 2 are swapped.

    Given an array and a permutation, apply the permutation to the array. 
    For example, given the array ["a", "b", "c"] and the permutation [2, 1, 0], return ["c", "b", "a"].

*/

Inout.push({ characters: '&AR a b c', permutation: '&AR 2 1 0' }, '&AR c b a');


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

const apply_permutation_one_line = (chars, perm) => chars.map((v, i) => chars[perm[i]])

Inout.solvers = [apply_permutation, apply_permutation_one_line];
Inout.solve();



function apply_permutation(chars, perm) {

    permutated = new Array(chars.length);
    for (let i = 0; i < perm.length; i++) {
        const index = perm[i];
        permutated[i] = chars[index];
    }

    return permutated;
}