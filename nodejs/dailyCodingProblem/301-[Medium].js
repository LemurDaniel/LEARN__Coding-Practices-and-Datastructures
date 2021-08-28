const Inout = new (require("../Inout"))("Daily Coding Problem --- Implement a BloomFilter Datastructure");
const { BitArray } = require("../datastructures/bits");
const { Readable } = require("stream");
const crypto = require("crypto");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Triplebyte.

    Implement a data structure which carries out the following operations without resizing the underlying array:

    add(value): Add a value to the set of values.
    check(value): Check whether a value is in the set.
    The check method may return occasional false positives (in other words, incorrectly identifying an element as part of the set), but should always correctly identify a true element.

*/

const BloomFilter = Initialize();

Inout.push({
    words: '&AR dog dark cat cat door dodge',
    isAdded: '&AR dog car bla blabla'
}, Inout.static.None);
Inout.push({
    words: '&FS ./dailyCode/038_words.txt &AR',
    isAdded: '&AR dog car bla blabla conflakes'
}, Inout.static.None);
Inout.push({
    words: '&FS ./dailyCode/038_10.000_words.txt &AR',
    isAdded: '&AR dog car bla blabla milk cornflakes'
}, Inout.static.None);
Inout.push({
    words: '&FS ./dailyCode/038_41.284_words.txt &AR',
    isAdded: '&AR dog car bla snowman olaf'
}, Inout.static.None);


Inout.solvers = [solver1]
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function solver1(words, isAdded) {

    const filter = new BloomFilter(words.length, 0.1);
    for (const word of words) {
        filter.add(word.toLowerCase());
    }

    const dict = {};
    for (const word of isAdded) {
        dict[word] = filter.check(word);
    }

    return {
        wordCount: words.length,
        falsePositives: Math.round((filter.actualP * 10000)) / 100 + '%',
        filterBits: filter.m,
        isAdded: dict,
    }
}




function Initialize() {
    return class BloomFilter {

        get actualP() {
            const m = this.m;
            const k = this.k;
            const n = this.n;
            const res = 1 - Math.pow(1 - (1 / m), k * n);
            return Math.pow(res, k);
        }

        /**
        * Get the optimal array size.
        * @param {n} The expected amount of elements for the filte.
        * @param {p} The maximum allowed propabillity for false positives.
        * @return {m} The optimal bit array size.
        */
        _optimalArraySize(n, p) {
            const numerator = n * Math.log(p);
            const denominator = Math.pow(Math.log(2), 2);
            return Math.round(- numerator / denominator);
        }


        /**
       * Get the optimal number of hashfunctions.
       * @param {m} The size of the bit array.
       * @param {n} The expected number of inserted elements.
       * @return {k} The optimal number of hashfunctions.
       */
        _optimalNumHashFunctions(m, n) {
            const k = m / n * Math.log(2);
            return Math.round(k);
        }

        constructor(n = 100, desiredP = 0.05) {
            // Expected element count;
            this.n = n;
            // Desired probability for false positives.
            this.desiredP = desiredP;

            // Size of the bitArray and number of hashfunctions.
            this.m = this._optimalArraySize(this.n, this.desiredP);
            this.k = this._optimalNumHashFunctions(this.m, this.n);

            this._bitArray = new BitArray(this.m);
        }


        * _getBitIndex(value) {

            for (let i = 0; i < this.k; i++) {
                const buffer = Buffer.from(value);
                value = crypto.createHash('md5').
                    update(buffer).digest('hex');

                yield parseInt(value, 16) % this.m;
            }
        }

        _getIndexStream(value) {
            const iterable = this._getBitIndex(value);
            return Readable.from(iterable);
        }

        addAsync(value) {
            this._getIndexStream(value).on('data',
                index => console.log(index)
            );
        }

        add(value) {
            const iterable = this._getBitIndex(value);
            for (const index of iterable) {
                this._bitArray.setBit(index);
            }
        }

        check(value) {
            const iterable = this._getBitIndex(value);
            for (const index of iterable) {
                const isSet = this._bitArray.isSet(index);
                if (!isSet) return false;
            }

            return true;
        }
    }

}

