const fs = require('fs');


const WINDOW_SIZE = 3;
const measurements = fs.readFileSync('./input/day01-input.txt', 'utf-8').split('\r\n').map( v => parseInt(v));


var firstWindow = 0;
var secondWindow = 0;
var measurementIncreases = 0;

for(let i=0; i<WINDOW_SIZE; i++)
  firstWindow += measurements[i];
  console.log(firstWindow + ' (N/A - no previous measurement)')

for(let i=WINDOW_SIZE; i<measurements.length; i++) {

  secondWindow = firstWindow + measurements[i] - measurements[i-WINDOW_SIZE];

  if (firstWindow === secondWindow)
    console.log(secondWindow + ' (no change)')
  else if (firstWindow > secondWindow)
    console.log(secondWindow + ' (decreased)')
  else {
    console.log(secondWindow + ' (increased)')
    measurementIncreases++;
  }

  firstWindow = secondWindow;

}


console.log(' --- ' + measurementIncreases + ' measurements are larger than the previous measurement.')