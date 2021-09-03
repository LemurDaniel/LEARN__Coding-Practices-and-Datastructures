const Inout = new (require('../Inout'))('Daily Coding Problem --- Multiply elements in array')

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Uber.

    Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

    For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. 
    If our input was [3, 2, 1], the expected output would be [2, 3, 6].

    Follow-up: what if you can't use division?

*/


Inout.push('&AR 1,2,3,4,5', '&AR 120,60,40,30,24');


Inout.solvers = [multiplyNumbers_twoLoops, multiplyNumbers_division, oneLiner, oneLiner2, oneLiner3];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*

    Basic approach with two loops:
        For each element loop once again through the array to multiply all numbers to itself.

        --- This approach doesn't use division.

        time complexity: O(n^2)  --- squared       --- For every number the whole list is traversed once.
        space complexity: O(n)   --- linear        --- Saves all values in a new array.
*/
function multiplyNumbers_twoLoops(list) {

    const result = [];

    for (let i = 0; i < list.length; i++) {

        let product = 1;
        for (let j = 0; j < list.length; j++) {
            // Prevent multiplying the same number to itself;
            if (j !== i) product *= list[j];
        }

        result[i] = product;
    }

    return result;
}


/*

    Approach with two loops and division:
        Traverse once through the array calculating the product of all elements.

        Traverse a second time through the array, saving the product dividey by the current element at its place.
        Since the product is all the numbers multiplied, dividing by one number is like multiplying all expect that number.

        time complexity: O(2n)  --- linear         --- The lis is traversed two times.
        space complexity: O(1)   --- constant      --- Saves all values in a new array.
*/
function multiplyNumbers_division(list) {

    const product = list.reduce((a, b) => a * b);

    for (let i = 0; i < list.length; i++)
        list[i] = product / list[i];

}

/*

    Fun approach:
        Functions like the one with division.

        time complexity: O(n^2)  --- quadratic     --- For every number the list ist reduced/traversed once.
        space complexity: O(n)   --- linear        --- Mapping an array creates a second array.
*/
function oneLiner(list) {

    return list.map((v, i, arr) => arr.reduce((a, b) => a * b) / v);

}

/*

    Fun approach:
        Functions without division.

        For every element a new array is created setting its place to a one, then its elements are multiplied.

        time complexity: O(n^2)  --- quadratic     --- For every number the list ist reduced/traversed once.
        space complexity: O(n^2)   --- quadratic   --- For each element an array with it set to 1 is created.
*/
function oneLiner2(list) {

    return list.map((v, i, arr) =>
        arr.map((v1, i1) => i1 === i ? 1 : v1).reduce((a, b) => a * b)
    );

}

/*

    Fun approach 2:
        Functions like the one with division.

        The array value is mapped resulting in an array of arrays where the first element is the number and the second a pointer to the original array.
        The Reduce function multiplies all elements while maintaining the pointer resulting in an array with the first value being the product of the array and the second a pointer to the original array.
        The second reduce concats both arrays to one, appending the product to the end of the array.
        The map applies division of the product (last element) and the current element.
        The last element is then cut out by reversing it and slicing it from index 1.

        time complexity: O(6n)   --- quadratic     --- Two maps, two reduces, two reverse and one slice, but still linear.
        space complexity: O(?)   --- linear        --- Its linear, but I dont know. An array of arrays (len 2) another map creating another array, two reduces?
*/
function oneLiner3(list) {

    return list.map((v, i, arr) => [v, arr]).
        reduce((a, b) => [a[0] * b[0], a[1]]).
        reduce((a, b) => b.concat(a)).
        map((v, i, arr) => arr[arr.length - 1] / v)
        .reverse().slice(1).reverse();

}