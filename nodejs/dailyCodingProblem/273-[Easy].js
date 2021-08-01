const Inout = new (require("../Inout"))("Daily Coding Problem --- Find fixed point in array");
const LinkedList = require("../datastructures/linkedList");
const { CustomError } = require("../Helper");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Apple.

    A fixed point in an array is an element whose value is equal to its index. Given a sorted array of distinct elements, return a fixed point, if one exists. Otherwise, return False.

    For example, given [-6, 0, 2, 40], you should return 2. 
    Given [1, 5, 7, 8], you should return False.

*/


Inout.push('&AR -5,2,3,4', false);
Inout.push('&AR -5,1,3,4', 1);
Inout.push('&AR -6,0,2,40', 2);
Inout.push('&AR -1,5,7,8', false);
Inout.push('&NI 11111111111111', 1);
Inout.push('&NI -24,-23,1,3,3,35,45,50', 3);

Inout.solvers = [findFixedPoint, findFixedPoint2, findFixedPoint_BinarySearch]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function findFixedPoint(arr) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] === i) return i;
    return false;
}

function findFixedPoint2(arr) {
    return arr.filter((v, i) => v === i)[0] ?? false;
}

function findFixedPoint_BinarySearch(arr) {

    let upper = arr.length;
    let lower = 0;

    let a = 0;
    while (lower <= upper) {

        a++;
        const mid = lower + Math.round((upper - lower) / 2);

        if (arr[mid] === mid) return mid;
        else if (arr[mid] > upper) upper = mid - 1;
        else if (arr[mid] < lower) lower = mid + 1;
        else {
            if (arr[lower] !== lower) lower++;
            if (arr[upper] !== upper) upper--;
        }
    }

    return false;
}