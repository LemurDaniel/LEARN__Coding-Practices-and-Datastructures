const Inout = new (require("../Inout"))("Daily Coding Problem --- Phytagorean triplet");
const { NodeQueue } = require("../datastructures/queue");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Mailchimp.

    You are given an array representing the heights of neighboring buildings on a city street, from east to west. 
    The city assessor would like you to write an algorithm that returns how many of these buildings have a view of the setting sun, in order to properly value the street.

    For example, given the array [3, 7, 8, 3, 6, 1], you should return 3, since the top floors of the buildings with heights 8, 6, and 1 all have an unobstructed view to the west.

    Can you do this using just one forward pass through the array?

*/

Inout.result_Equals = Helper.hasArray_sameValues;

Inout.push('&AR 3,7,8,3,6,1', '&AR 8,6,1')

Inout.solvers = [buildingWithUnobstructedView]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function buildingWithUnobstructedView(arr) {

    const buildings = [];
    let maxHeigt = 0;

    for (let i = arr.length - 1; i >= 0; i--) {
        if(arr[i] <= maxHeigt) continue;
        maxHeigt = arr[i];
        buildings.push(arr[i]);
    }

    return buildings;
}
