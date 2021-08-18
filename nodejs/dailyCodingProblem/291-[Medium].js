const Inout = new (require("../Inout"))("Daily Coding Problem --- Smallest number of boat trips");
const { MergeSort } = require("../Helper");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Glassdoor.

    An imminent hurricane threatens the coastal town of Codeville. 
    If at most two people can fit in a rescue boat, and the maximum weight limit for a given boat is k, determine how many boats will be needed to save everyone.

    For example, given a population with weights [100, 200, 150, 80] and a boat limit of 200, the smallest number of boats required will be three.

*/

Inout.result_Equals = (oup, res) => res != null && res.numberOfTrips === oup.numberOfTrips;
Inout.result_converter = arg => ({ numberOfTrips: `There are a minimum of ${arg.numberOfTrips} boat trips required.`, ...arg })

Inout.push({
    boatLimit: 200,
    population: '&AR 100,200,150,80',
}, {
    numberOfTrips: 3,
    trips: '&AR 80,100|150|200',
})
Inout.push({
    boatLimit: 3,
    population: '&AR 1,2',
}, {
    numberOfTrips: 1,
    trips: '&AR 1,2|',
})
Inout.push({
    boatLimit: 3,
    population: '&AR 3,2,2,1',
}, {
    numberOfTrips: 3,
    trips: '&AR 1,2|2|3',
})
Inout.push({
    boatLimit: 5,
    population: '&AR 3,5,3,4',
}, {
    numberOfTrips: 4,
    trips: '&AR 3|3|4|5'
})

Array.prototype.peek = function () {
    return this[this.length - 1];
}

Inout.solvers = [smallestNumberOfBoatTrips_sortArray]

Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function smallestNumberOfBoatTrips_sortArray(boatLimit, population) {

    MergeSort.sort(population, (a, b) => a - b)

    let numberOfTrips = 0;
    let sateOfTrips = [];

    while (population.length > 0) {

        numberOfTrips++;
        let currLim = 0;
        let currTrip = [];

        while (population.length > 0) {
            if (currLim + population.peek() > boatLimit) break;

            const currPop = population.pop();
            currLim += currPop;
            currTrip.push(currPop)
        }

        sateOfTrips.push(currTrip)
    }

    return {
        numberOfTrips: numberOfTrips,
        trips: sateOfTrips
    };
}
