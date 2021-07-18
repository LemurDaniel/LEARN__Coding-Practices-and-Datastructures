const Inout = new (require("../Inout"))("Daily Coding Problem --- Rearrange linked list");
const LinkedList = require("../datastructures/linkedList");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by WhatsApp.

    Given an array of integers out of order, determine the bounds of the smallest window that must be sorted in order for the entire array to be sorted. 
    For example, given [3, 7, 5, 6, 9], you should return (1, 3).

*/

Inout.push('&AR 3,7,5,6,9', '&AR 1,3');
Inout.push('&AR 2,6,4,8,10,9,15', '&AR 1,5');
Inout.push('&AR 2,6,4,1,10,9,15', '&AR 0,5');
Inout.push('&AR 2,6,4,1,17,9,15', '&AR 0,6');
Inout.push('&AR 1,2,3,4,5,6,7,8', '&AR -1,-1');
Inout.push('&AR 1', '&AR -1,-1');

Inout.solvers = [findBounds, findBounds_dumbWay];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function findBounds(arr) {

    let leftBound;
    let rightBound;

    // Find bounds of first unordered segment.
    for (let i = 1; i < arr.length; i++) {
        const rightIdx = arr.length - 1 - i;
        const leftIdx = i;

        if (!rightBound && arr[rightIdx + 1] < arr[rightIdx]) rightBound = rightIdx;
        if (!leftBound && arr[leftIdx - 1] > arr[leftIdx]) leftBound = leftIdx;
    }

    // Return 0,0 as index if array is already sorted.
    if (leftBound === undefined &&
        rightBound === undefined) return [-1, -1]

    // Switch left and right bound if leftbound is bigger.
    if (leftBound > rightBound)
        [leftBound, rightBound] = [rightBound, leftBound];


    // Search min and max element.
    let min = Infinity;
    let max = 0;

    for (let i = leftBound; i <= rightBound; i++) {
        min = Math.min(arr[i], min);
        max = Math.max(arr[i], max);
    }


    // Seach final bounds of unordered segment,
    if (min < arr[0]) leftBound = 0;
    if (max > arr[arr.length - 1])
        rightBound = arr.length - 1;

    for (let i = leftBound - 1; i >= 0; i--) {
        if (arr[i] > min) continue;
        leftBound = i + 1;
        break;
    }

    for (let i = rightBound + 1; i < arr.length; i++) {
        if (arr[i] < max) continue;
        rightBound = i - 1;
        break;
    }


    return [leftBound, rightBound];
}


function findBounds_dumbWay(arr) {

    const copy = arr.map(v => v);
    Helper.MergeSort.sort(copy);

    const bounds = [-1, -1];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== copy[i]) {
            bounds[0] = i;
            break;
        }
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== copy[i]) {
            bounds[1] = i;
            break;
        }
    }

    return bounds;
}