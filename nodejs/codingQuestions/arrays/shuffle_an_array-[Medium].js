
const Inout = new (require('../../Inout'))('Coding Questions --- Shuffle an array - [difficulty: Medium]');
const Helper = require('../../Helper');

/*
    Shuffle a set of numbers without duplicates.

    Example:
        // Init an array with set 1, 2, and 3.
        int[] nums = {1,2,3};
        Solution solution = new Solution(nums)

        // Shuffle the array [1,2,3] and return its result. Any permutation must be equally likely.
        solutions.shuffle();


        // Resets the array back to its original configuration.
        solution.reset();

        // Returns the random shuffling of the array.
        solution.shuffle();
*/

const ArrayShuffler = initialize();

Inout.push('&AR 1,2,3', () => true)

Inout.solvers = [testShuffler1, testShuffler2];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function testShuffler1(array) {
    return baseShuffler(array, 'shuffle1')
}

function testShuffler2(array) {
    return baseShuffler(array, 'shuffle2')
}




function baseShuffler(array, shuffle) {

    const shuffler = new ArrayShuffler(array);
    const shuffles = [];

    for (let i = 0; i < Math.min(array.length, 20); i++) {
        shuffler[shuffle]();
        shuffles.push(array.map(v => v))
    }


    shuffler.reset();

    return {
        array: array,
        shuffles: shuffles,
    }
}



function initialize() {

    return class ArrayShuffler {

        get array() {
            return this._array;
        }

        constructor(array) {
            this._array = array;
            this._original = [...array];
        }

        shuffle1() {

            const indexes = [];
            const array = this._array;

            for (let i = 0; i < array.length; i++)
                indexes.push(i)

            for (let i = 0; i < array.length; i++) {
                const random = Math.floor(Math.random() * indexes.length);
                const idx = indexes.splice(random, 1)[0];

                this._array[i] = this._original[idx];
            }

            return this._array;
        }

        shuffle2() {

            const array = this._array;

            for (let i = array.length * 10; i >= 0; i--) {
                const idx1 = Math.floor(Math.random() * array.length);
                const idx2 = Math.floor(Math.random() * array.length);

                [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
            }

            return this._array;
        }

        reset() {
            const original = this._original;
            const array = this._array;

            for (let i = 0; i < array.length; i++)
                array[i] = original[i];

            return array;
        }
    }
}