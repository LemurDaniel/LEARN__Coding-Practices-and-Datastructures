const fs = require('fs');

const argument = process.argv[2] ?? 'TEST'
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day04-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day04-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const input = fileContent.split('\r\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

const numberOfFullyContainedSections = input
  .map(sectionPair => sectionPair.split(',')
    .map(section => section.split('-').map(v => parseInt(v)))
    .map(section =>
      [...Array(100).keys()].filter(v => v >= section[0] && v <= section[1]).join(',')
    )
    .map(section => `,${section},`) // Add beginning, traling ',' to prevent failures on cases like: ['1-1,3-95', '8-82,7-7', '5-96,4-5', '3-4,4-47', '8-96,5-6']
  ).filter(
    sectionPair => sectionPair[0].includes(sectionPair[1]) || sectionPair[1].includes(sectionPair[0])
  ).length

const numberOfFullyContainedSections2 = input
  .map(sectionPair => sectionPair.split(',')
    .map(section => section.split('-').map(v => parseInt(v)))
    .map(section => ({ min: section[0], max: section[1] })) // Convert to object from array, to have more readable code afterwards
  ).filter(sectionPair =>
    (sectionPair[0].min >= sectionPair[1].min && sectionPair[0].max <= sectionPair[1].max) ||
    (sectionPair[1].min >= sectionPair[0].min && sectionPair[1].max <= sectionPair[0].max)
  ).length


console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.log(`${numberOfFullyContainedSections} of Section Pairs contain either on or the other range fully.`)
console.log(`${numberOfFullyContainedSections2} of Section Pairs contain either on or the other range fully.\n`)