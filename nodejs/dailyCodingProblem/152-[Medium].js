const Inout = new (require("../Inout"))("Daily Coding Problem --- Generate output with weighted probalilites");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Triplebyte.

    You are given n numbers as well as n probabilities that sum up to 1. Write a function to generate one of the numbers with its corresponding probability.

    For example, given the numbers [1, 2, 3, 4] and probabilities [0.1, 0.5, 0.2, 0.2], your function should return 1 10% of the time, 2 50% of the time, and 3 and 4 20% of the time.

    You can generate random numbers between 0 and 1 uniformly.
*/

Inout.input_stringConverter = arg => Helper.default_StringConverter(
    { ...arg, map: arg.inputs.map((v, i) => ({ [`'${v}'`]: arg.probabilites[i] * 100 + '%' })).reduce((a, b) => ({ ...a, ...b })) }
)

function validate(testcase, result) {
    const { allowedDeviance } = result;
    for (const obj of Object.values(result.results)) {
        if (obj.deviance > allowedDeviance) return false;
    }
    return true;
}

Inout.push({ inputs: '&AR birds,cats,dogs,snakes', probabilites: '&AR 0.1,0.5,0.2,0.2' }, validate);
Inout.push({ inputs: '&AR 1,2,3,4', probabilites: '&AR 0.1,0.5,0.2,0.2' }, validate);

Inout.solvers = [distributeProbabillites, distributeProbabillites2]
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function getRandomInput(input, props, bound) {
    const random = Math.random() * bound;
    for (const idx in props) {
        if (random > props[idx]) continue;
        return input[idx];
    }
}
function distributeProbabillites(inputs, probabillities, allowedDeviance = 0.005, bound = 1, nLoops = 10e5) {

    let sum = 0;
    const props = probabillities.map(v => { sum += v * bound; return sum });

    const results = {};
    const total = nLoops;
    while (nLoops-- > 0) {

        const inp = getRandomInput(inputs, props, bound);
        if (inp in results)
            results[inp]++;
        else
            results[inp] = 1;
    }


    let summedDeviances = 0;
    for (let i = 0; i < inputs.length; i++) {
        const [key, val] = [inputs[i], results[inputs[i]]];
        const actualProp = Math.round(val / total * 10e4) / 10e2;
        const deviance = Math.abs(probabillities[i] - (val / total))
        summedDeviances += deviance;
        results[key] = {
            picks: val,
            aimedProp: probabillities[i] * 100 + '%',
            actualProp: actualProp,
            deviancePercent: Math.round(deviance * 100 * 10e6) / 10e6 + '%',
            deviance: Math.round(deviance * 10e6) / 10e6,
        }
    }
    return {
        numberOfPicks: total,
        allowedDeviancePercent: allowedDeviance * 100 + '%',
        allowedDeviance: allowedDeviance,
        averageDeviancePercent: summedDeviances / inputs.length * 100 + '%',
        averageDeviance: summedDeviances / inputs.length,
        results: results
    };
}


function distributeProbabillites2(inputs, probabillities, allowedDeviance = 0.005, bound = 100, nLoops = 10e5) {

    let sum = 0;
    const props = probabillities.map(v => v * 100);
    const array = [];
    for (let i = 0; i < props.length; i++) {
        while (props[i]-- > 0) array.push(inputs[i])
    }

    const results = {};
    const total = nLoops;
    while (nLoops-- > 0) {

        const rand = array[Math.round(Math.random() * array.length)];
        if (rand in results)
            results[rand]++;
        else
            results[rand] = 1;
    }

    let summedDeviances = 0;
    for (let i = 0; i < inputs.length; i++) {
        const [key, val] = [inputs[i], results[inputs[i]]];
        const actualProp = Math.round(val / total * 10e4) / 10e2;
        const deviance = Math.abs(probabillities[i] - (val / total))
        summedDeviances += deviance;
        results[key] = {
            picks: val,
            aimedProp: probabillities[i] * 100 + '%',
            actualProp: actualProp,
            deviancePercent: Math.round(deviance * 100 * 10e6) / 10e6 + '%',
            deviance: Math.round(deviance * 10e6) / 10e6,
        }
    }
    return {
        numberOfPicks: total,
        allowedDeviancePercent: allowedDeviance * 100 + '%',
        allowedDeviance: allowedDeviance,
        averageDeviancePercent: summedDeviances / inputs.length * 100 + '%',
        averageDeviance: summedDeviances / inputs.length,
        results: results
    };
}