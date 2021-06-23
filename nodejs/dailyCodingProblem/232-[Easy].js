const Inout = new (require("../Inout"))("Daily Coding Problem --- Implement a PrefixMapsum");
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    Implement a PrefixMapSum class with the following methods:

    insert(key: str, value: int): Set a given key's value in the map. If the key already exists, overwrite the value.
    sum(prefix: str): Return the sum of all values of keys that begin with a given prefix.
    For example, you should be able to run the following code:

    mapsum.insert("columnar", 3)
    assert mapsum.sum("col") == 3

    mapsum.insert("column", 2)
    assert mapsum.sum("col") == 5

*/


const PrefixMapSum = preInitialize();
Inout.push('&AR INSERT, columnar, 3|SUM, col|INSERT, column, 2|SUM, col', [3, 5])
Inout.solvers = [solver, solver_via_tree_structure];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function solver(instructions) {

    const res = [];

    const dict = {};
    for (const inst of instructions) {
        const [op, param, param2] = inst;

        if (op === 'INSERT') dict[param] = param2;
        else if (op === 'SUM') {
            res.push(
                Object.keys(dict)
                    .map(v => v.indexOf(param) == 0 ? dict[v] : 0)
                    .reduce((a, b) => a + b)
            )
        }
    }

    return res;
}

function solver_via_tree_structure(instructions) {

    const res = [];
    const pms = (new PrefixMapSum()).root;

    for (const inst of instructions) {
        const [op, ...params] = inst;

        if (op === 'INSERT') pms.insert(...params);
        else if (op === 'SUM') {
            res.push(
                pms.sum(params[0])
            );
        }
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