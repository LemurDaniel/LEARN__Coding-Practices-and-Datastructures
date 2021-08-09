const Inout = new (require("../Inout"))("Daily Coding Problem --- Phytagorean triplet");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Netflix.

    Given an array of integers, determine whether it contains a Pythagorean triplet. 
    Recall that a Pythogorean triplet (a, b, c) is defined by the equation a2+ b2= c2.

*/

Inout.push('&AR 3,1,4,6,5', '&AR 3,4,5');
Inout.push('&AR 10,4,6,12,5', false);

Inout.solvers = [phytagoreanTriplet_bruteForce]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function phytagoreanTriplet_bruteForce(nums) {

    const dict = {};
    for (const num of nums)
        dict[num * num] = num;


    for (const a of nums) {
        for (const b of nums) {
            const cpow2 = a * a + b * b;
            if (cpow2 in dict)
                return [a, b, dict[cpow2]]
        }
    }

    return false;
}