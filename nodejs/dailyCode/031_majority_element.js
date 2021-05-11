const Inout = new (require("../Inout"))("DailyCode --- Picking up Change");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by AirBNB:

    A majority element is an element that appears more than half the time. Given a list with a majority element, find the majority element.

    Here's an example and some starting code.

    def majority_element(nums):
    # Fill this in.

    print(majority_element([3, 5, 3, 3, 2, 4, 3]))
    # 3

*/

Inout.push('&AR 3,5,3,2,4,3', 3);

Inout.solvers = [majority_element];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function majority_element(list) {

    let maj_el = 0;
    const dict = { [maj_el]: 0 };

    for(let num of list) {
        if(num in dict && ++dict[num] > dict[maj_el]) maj_el = dict[num];
        else if( !(num in dict) ) dict[num] = 1;
    }

    return maj_el;
}

