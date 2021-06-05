const Inout = new (require ('../Inout'))('Other --- Sorting');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Microsoft.

    Given a string and a pattern, find the starting indices of all occurrences of the pattern in the string. 
    For example, given the string "abracadabra" and the pattern "abr", you should return [0, 7].

*/

const arr = Helper.random_Array(10,100, 10, 25);
Inout.push( arr, arr.map( v => v ).sort() ); 


Inout.solvers = [MergeSort];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function MergeSort(list) {
    Helper.MergeSort.sort(list);
}