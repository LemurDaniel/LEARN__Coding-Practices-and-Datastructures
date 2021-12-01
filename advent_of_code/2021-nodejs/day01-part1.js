const fs = require('fs');
const readline = require('readline');


const measurements = readline.createInterface({
  input: fs.createReadStream('./input/day01-input.txt')
});

var lastDepth = null;
var measurementIncreases = 0;

measurements.on('line', depth => {

  depth = parseInt(depth);

  if (lastDepth === null)
    console.log(depth + ' (N/A - no previous measurement)')
  else if (depth === lastDepth)
    console.log(depth + ' (no change)')
  else if (depth < lastDepth)
    console.log(depth + ' (decreased)')
  else if (depth > lastDepth) {
    console.log(depth + ' (increased)')
    measurementIncreases++;
  }

  lastDepth = depth;
})

measurements.on('close', () =>
  console.log(' --- ' + measurementIncreases + ' measurements are larger than the previous measurement.')
);
