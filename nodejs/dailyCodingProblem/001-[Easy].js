const Inout = new (require('../Inout'))('Daily Coding Problem --- Two Sum')

/*

    Good morning! Here's your coding interview problem for today.

    This problem was recently asked by Google.

    Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

    For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

    Bonus: Can you do this in one pass?

*/

Inout.output_stringConverter = arg => `${arg[0]} + ${arg[1]} = ${arg[0] + arg[1]}`
Inout.result_stringConverter = Inout.output_stringConverter;

Inout.push({ list: '&AR 10,15,3,7', k: 17 }, [10, 7]);
Inout.push({ list: '&AR 2,7,11,15', k: 9 }, [2, 7]);
Inout.push({ list: '&AR 3,2,4', k: 6 }, [2, 4]);
Inout.push({ list: '&AR 3,3', k: 6 }, [3, 3]);

Inout.solvers = [findNumbersAddingUptoTarget_twoLoops, findNumbersAddingUptoTarget_dictionary];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*

    Basic approach with two loops:
        The first loop iterates through all elements and the second one adds up every element in the list to the first loop's current number.

        time complexity: O(n^2)  --- squared       --- For every number the whole list is traversed once.
        space complexity: O(1)   --- constant 
*/
function findNumbersAddingUptoTarget_twoLoops(list, k) {

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {

            // Prevent adding the same number to itself;
            if (j === i) continue;

            if (list[i] + list[j] === k)
                return [list[i], list[j]];

        }
    }

    return [-1, -1]
}

