const fs = require('fs');

const input = fs.readFileSync('input/day04-input.txt', 'utf-8').split('\r\n');
//const input = fs.readFileSync('input/day04-input-test.txt', 'utf-8').split('\r\n');

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

const numberOfOverlappingSections = input
  .map(sectionPair => sectionPair.split(',')
    .map(section => section.split('-').map(v => parseInt(v)))
    .map(section => ({ min: section[0], max: section[1] })) // Convert to object from array, to have more readable code afterwards
  ).filter(sectionPair =>
    (sectionPair[1].min <= sectionPair[0].max && sectionPair[1].min >= sectionPair[0].min) ||
    (sectionPair[0].min <= sectionPair[1].max && sectionPair[0].min >= sectionPair[1].min)
  ).length

console.log(`${numberOfOverlappingSections} of Section Pairs have overlapping sections.`)