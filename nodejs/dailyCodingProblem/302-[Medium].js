const Inout = new (require("../Inout"))("Daily Coding Problem --- Number of regions in a matrix");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Uber.

    You are given a 2-d matrix where each cell consists of either /, \, or an empty space. 
    Write an algorithm that determines into how many regions the slashes divide the space.

    For example, suppose the input for a three-by-six grid is the following:

       \    /
        \  /
         \/
    Considering the edges of the matrix as boundaries, this divides the grid into three triangles, so you should return 3.

    // Assumption: A region must consist of at least one empty space.
    // The inside if the following won't be counted as a region.
        /\  
        \/
*/


Inout.result_Equals = (oup, res) => (typeof res === 'object' && res.regions === oup) || res === oup;

Inout.input_Converter = arg => Helper.default_Converter(arg.replaceAll('I', '\\'))
Inout.input_stringConverter = arg => Helper.printMatrix(
    arg.map(row => row.map(v => v === '' ? '-' : v)), true, 1
);

// I gets later replaced by \, since \ is a escape character and would need to be escaped everytime.
Inout.push('&NA '
    + 'I, , , , ,/|'
    + ' ,I, , ,/, |'
    + ' , ,I,/, , ',
    3);

Inout.push('&NA '
    + ' , , ,I, , , , ,/|'
    + ' , ,/, ,I, , ,/, |'
    + ' , ,I, , ,I,/, , |'
    + ' , , ,I, ,/, , , ',
    4);

Inout.push('&NA '
    + ' , , ,I, , , , ,/|'
    + ' , ,/,I,I, , ,/, |'
    + ' , ,I,/, ,I,/, , |'
    + ' , , ,I, ,/,I, , |'
    + ' , , , ,/, , ,I, ',
    5);

Inout.push('&NA '
    + 'I, , ,I, , , , ,/|'
    + ' ,I,/, ,I, , ,/, |'
    + ' ,/,I, , ,I,/, , |'
    + '/, , ,I, ,/,I, , |'
    + ' , , , ,/, , ,I, ',
    7);


Inout.solvers = [CounterNumberOfRegions]

Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/



function recursiveCrawler(pos, region, matrix, parsed) {

    const [row, col] = pos;

    if (row < 0 || row >= matrix.length) return 0;
    if (col < 0 || col >= matrix[0].length) return 0;

    if (matrix[row][col] !== '') return 0;
    if (pos in parsed) return 0;

    // Mark position in matrix as part of an region.
    parsed[pos] = region;
    let regionSize = 1;

    // Crawl in all directions to slowly claim all indexes that are part of this region.
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {

        const deltaX = Math.round(Math.cos(angle));
        const deltaY = Math.round(Math.sin(angle));

        const x = pos[0] + deltaX;
        const y = pos[1] + deltaY;

        regionSize += recursiveCrawler([x, y], region, matrix, parsed);
    }

    return regionSize;
}


function CounterNumberOfRegions(matrix) {

    const regionsSizes = {};
    const parsed = {};
    let region = 0;

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {

            const pos = [row, col];
            const value = matrix[row][col];

            if (value !== '' || pos in parsed) continue;

            const size = recursiveCrawler(pos, ++region, matrix, parsed);
            regionsSizes[region] = size;
        }
    }


    return {
        regions: region,
        regionSizes: regionsSizes
    };
}