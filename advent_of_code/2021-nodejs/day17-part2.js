const fs = require('fs');

// const input = 'target area: x=20..30, y=-10..-5'.substring(13).split(',').map(v => v.trim().substring(2).split('..')).flat();
const input = 'target area: x=209..238, y=-86..-59'.substring(13).split(',').map(v => v.trim().substring(2).split('..')).flat();

console.log(input)
const targetBounds = {
  xMin: Math.min(input[0], input[1]),
  xMax: Math.max(input[0], input[1]),
  yMin: Math.min(input[2], input[3]),
  yMax: Math.max(input[2], input[3]),
}


// Different possible xVelovitys.

// 1 ==> those that reach the target in 1 step. which are equal to the bounds: deltaX=20 to deltaX=30. ==> sums up to 30-20+1=11 possible xSpeeds.
// ==> those need a deltaY that reaches the area in one step to, so from deltyY=-5 to deltaY=-10. ==> sums up to -10--5+1=6 possible xSpeeds.
// All permutations of those are 11 * 6 = 66 possible
const AllPermutations_ForOneStep = (targetBounds.xMax - targetBounds.xMin + 1) * (targetBounds.yMax - targetBounds.yMin + 1);


// 2 ==> Smallest Possible and largest Possible deltaX for reaching the area.

// Following only work when target area has positive maxX and minX. 
// Writing code to fit all cases is not needed to solve the input.
let highestPossible_deltaX = Math.floor(targetBounds.xMax / 2) + 1; // In two steps not one.
let lowestPossible_deltaX = 0;
for (let sum = 0; sum < targetBounds.xMin;) {
  sum += ++lowestPossible_deltaX;
}

// Following only work when target area has negative maxY and minY. 
// Writing code to fit all cases is not needed to solve the input.
let highestPossible_deltaY = -targetBounds.yMin
let lowestPossible_deltaY = Math.floor(targetBounds.yMin / 2) + 1; // In two steps.

console.log(lowestPossible_deltaX, highestPossible_deltaX);
console.log(lowestPossible_deltaY, highestPossible_deltaY);


function testIfAreaReached_bruteForce(deltaX, deltaY, maxSteps = 10e4) {
  for (let x = deltaX, y = deltaY, steps = 0; steps < maxSteps; steps++) {
    x += Math.max(0, --deltaX);
    y += --deltaY;
    if (x > targetBounds.xMax || y < targetBounds.yMin) return false;
    if (x >= targetBounds.xMin && y <= targetBounds.yMax) return true;
  }

  return false;
}

// testIfAreaReached_bruteForce(8, 1);


let AllPermutations_ForMultipleSteps = 0;

for (let deltaX = lowestPossible_deltaX; deltaX <= highestPossible_deltaX; deltaX++) {
  for (let deltaY = lowestPossible_deltaY; deltaY <= highestPossible_deltaY; deltaY++) {
    if (testIfAreaReached_bruteForce(deltaX, deltaY) === true)
      AllPermutations_ForMultipleSteps++;
  }
}

console.log(' Sum of all distinct velocity values: ' + (AllPermutations_ForMultipleSteps + AllPermutations_ForOneStep))