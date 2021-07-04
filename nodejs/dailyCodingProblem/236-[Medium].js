const Inout = new (require("../Inout"))("Daily Coding Problem --- Implement a PrefixMapsum");
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Nvidia.

    You are given a list of N points (x1, y1), (x2, y2), ..., (xN, yN) representing a polygon. 
    You can assume these points are given in order; that is, you can construct the polygon by connecting point 1 to point 2, point 2 to point 3, and so on, finally looping around to connect point N to point 1.

    Determine if a new point p lies inside this polygon. (If p is on the boundary of the polygon, you should return False).

*/



const PrefixMapSum = preInitialize();
Inout.push()
Inout.solvers = [solver, solver_via_tree_structure];
Inout.solve();

// TODO


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function isPointInShape( shape, point) {

}