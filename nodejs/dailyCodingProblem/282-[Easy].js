const Inout = new (require("../Inout"))("Daily Coding Problem --- Phytagorean triplet");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Netflix.

    Given an array of integers, determine whether it contains a Pythagorean triplet. 
    Recall that a Pythogorean triplet (a, b, c) is defined by the equation a2+ b2= c2.

*/

Inout.push('&AR 3,1,4,6,5', '&AR 3,4,5');
Inout.push('&AR 10,4,6,12,5', false);

Inout.solvers = [phytagoreanTriplet_bruteForce, phytagoreanTriplet_hashing, phytagoreanTriplet_hashing2]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

// Time complexity: (n^3)  -  Cubic
// Space complxity: 1 - constant

function phytagoreanTriplet_bruteForce(nums) {

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {

            // First too loops multiply all numbers with eacht other.
            const [a, b] = [nums[i], nums[j]];
            const cpow2 = a * a + b * b;

            // Third loop checks whether resultung c^2 is in the array.
            for (let k = 0; k < nums.length; k++) {

                const c = nums[k];
                if (c * c === cpow2)
                    return [a, b, c];
            }
        }
    }

    return false;
}

// Time complexity: (n + n^2)  -  Quadratic
// Space complxity: n - linear

function phytagoreanTriplet_hashing(nums) {

    const dict = {};
    for (const num of nums)
        dict[num * num] = num;


    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {

            // Works like upper method but replaces third loop with a dictionary for looking up the value.
            if (i === j) continue;

            const [a, b] = [nums[i], nums[j]];
            const cpow2 = a * a + b * b;
            if (cpow2 in dict)
                return [a, b, dict[cpow2]]
        }
    }

    return false;
}

// Time complexity: (n + n^2)  -  Quadratic
// Space complxity: n - linear

function phytagoreanTriplet_hashing2(nums) {

    // Simulate using only a hashset like in java for example.
    const dict = {};
    for (const num of nums)
        dict[num] = null;


    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {

            if (i === j) continue;

            const [a, b] = [nums[i], nums[j]];
            const cpow2 = a * a + b * b;
            const c = Math.round(Math.sqrt(cpow2));
            if( c*c !== cpow2) continue;

            if (c in dict)
                return [a, b, c]
        }
    }

    return false;
}