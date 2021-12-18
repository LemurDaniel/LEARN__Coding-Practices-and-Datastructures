const fs = require('fs');

// const input = 'target area: x=20..30, y=-10..-5'.substring(13).split(',').map(v => v.trim().substring(2).split('..')).flat();
const input = 'target area: x=209..238, y=-86..-59'.substring(13).split(',').map(v => v.trim().substring(2).split('..')).flat();

console.log(input)
const targetBounds = {
  xMin: input[0],
  xMax: input[1],
  yMin: input[2],
  yMax: input[3]
}

// Highest arch is achieved by using smallest possible x-velocity to still get into target area.
// Smallest x-velocity is found by counting 1+2+3+4+... until sum is >= lowest target x.
let stepsNeeded = 0;
let smallestXvelocity = 0;
for (let sum = 0; sum < targetBounds.xMin;) {
  stepsNeeded++;
  sum += ++smallestXvelocity;
}

let biggestYvelocity = 0;
// Highest arch is achieved by finding the biggest y-velocity, without the probing overshooting the target area, due to velocity increase by gravity.
// The arch starts at velocity deltaY, then reaches its maxima and then falls down again to the initial startingY.
// Now back at startingY it has the same initial deltaY as falling speed. 
// y=0 deltaY=5 ==> maxima: y=15, deltaY=0 ==> falling down: y=0 deltyY=-5

// Finding the biggestYvelocity means finding how fast the probe is allowed to fall down from y=0 without overshooting the target area.
// ==> deltaY must be euqalTo or smaller than the lowest Y of the target area => -10
// ==> the verticalVelcoity must reach y=0 again after at least 'stepsNeed-1' steps or else it will fall before the target area on the x-axis is reached.
// looking at the input with 209 => 20 steps are needed and deltaY=-86 covers those 20 steps well.

biggestYvelocity = -targetBounds.yMin;
for(let step=1, sum=0; biggestYvelocity>0; step++) {
  sum += --biggestYvelocity;
  console.log('Step: ' + step + ' --- Height: ' + sum)
}

