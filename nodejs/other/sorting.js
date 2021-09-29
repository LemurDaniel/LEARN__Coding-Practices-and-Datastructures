const Inout = new (require('../Inout'))('Other --- Sorting');
const Helper = require('../Helper');


const arr = Helper.randomArray(10, 100, 10, 25);
Inout.push(arr, arr.map(v => v).sort());

Inout.push('&LL' + arr.join(','), '&LL' + arr.sort().join(','));


Inout.solvers = [MergeSort, CountingSort];

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

function CountingSort(list) {
    Helper.CountingSort.sort(list);
}