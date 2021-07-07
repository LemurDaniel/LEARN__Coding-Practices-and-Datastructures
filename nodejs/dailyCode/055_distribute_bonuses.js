const Inout = new (require("../Inout"))("DailyCode --- Distribute Bonuses");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Twitter:

    You are the manager of a number of employees who all sit in a row. The CEO would like to give bonuses to all of your employees, but since the company did not perform so well this year the CEO would like to keep the bonuses to a minimum.

    The rules of giving bonuses is that:
    - Each employee begins with a bonus factor of 1x.
    - For each employee, if they perform better than the person sitting next to them, the employee is given +1 higher bonus (and up to +2 if they perform better than both people to their sides).

    Given a list of employee's performance, find the bonuses each employee should get.

    Example:
    Input: [1, 2, 3, 2, 3, 5, 1]
    Output: [1, 2, 3, 1, 2, 3, 1]
    Here's your starting point:

    def getBonuses(performance):
    # Fill this in.

    print getBonuses([1, 2, 3, 2, 3, 5, 1])
    # [1, 2, 3, 1, 2, 3, 1]


*/


Inout.push('&AR 1 2 3 2 3 5 1', '&AR 1 2 3 1 2 3 1')

Inout.solvers = [distributeBonuses, distributeBonuses_variant2];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function distributeBonuses(arr) {

    const bonuses = [];

    for (let i = 0; i < arr.length; i++) {

        const left = i === 0 ? arr[i] : arr[i - 1];
        const right = i === arr.length - 1 ? arr[i] : arr[i + 1];

        const rightBonus = right < arr[i] ? 1 : 0;
        const leftBonus = left < arr[i] ? 1 : 0;

        bonuses[i] = 1 + rightBonus + leftBonus;
    }

    return bonuses;
}



function distributeBonuses_variant2(arr) {

    const bonuses = [1];

    for (let i = 0; i < arr.length - 1; i++) {

        const curr = arr[i];
        const next = arr[i + 1];

        // Initialize bonus for next worker at one.
        bonuses[i + 1] = 1;

        // If the current performance is worse than the next one then apply bonus to next worker,
        if (next > curr) bonuses[i + 1]++;
        else // else apply bonus to current worker.
        if (curr > next) bonuses[i]++;
    }

    return bonuses;
}
