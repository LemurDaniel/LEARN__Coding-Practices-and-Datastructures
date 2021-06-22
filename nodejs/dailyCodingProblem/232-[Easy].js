const Inout = new (require("../Inout"))("Daily Coding Problem --- Implement a PrefixMapsum");
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Twitter.

    Given a list of numbers, create an algorithm that arranges them in order to form the largest possible integer. 
    For example, given [10, 7, 76, 415], you should return 77641510.

*/


const PrefixMapSum = preInitialize();
Inout.push('&AR INSERT, columnar, 3|SUM, col|INSERT, column, 2|SUM, col', [3, 5])
Inout.solvers = [solver];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function solver(instructions) {

    const res = [];
    const pms = (new PrefixMapSum()).root;

    for (const inst of instructions) {
        if (inst[0] === 'INSERT') pms.insert(inst[1], inst[2]);
        else if (inst[0] === 'SUM') res.push(pms.sum(inst[1]));
    }

    return res;
}






function preInitialize() {
    return class PrefixMapSum {

        static Node = function (value = 0) {
            this.nodes = {};
            this.value = value;


            this.insert = function (key, value, index = 0) {
                const c = key[index];

                if (!(c in this.nodes))
                    this.nodes[c] = new PrefixMapSum.Node();

                if (index + 1 < key.length)
                    this.nodes[c].insert(key, value, index + 1);
                else
                    this.nodes[c].value = value;

            }

            this.sum = function (prefix, index = 0, prev) {

                if (index == prefix.length)
                    return this.sumAllValues();

                const c = prefix[index];
                if (!(c in this.nodes)) return 0;
                else return this.nodes[c].sum(prefix, index + 1, this);

            }


            this.sumAllValues = function () {

                let sum = this.value;
                for (const node of Object.values(this.nodes))
                    sum += node.sumAllValues();

                return sum;

            }
        }

        constructor() {
            this.root = new PrefixMapSum.Node('<>');
        }

    }
}