const fs = require('fs');

// const playersPositions = [4, 8];
const playersPositions = [4, 7];
const playersScores = [0, 0];
let playersTurn = 0;
let diceRolls = 0;
let dice = 0;

while (!playersScores.some(v => v >= 1000)) {

  const roll = ++dice + ++dice + ++dice;
  playersPositions[playersTurn] =
    (playersPositions[playersTurn] - 1 + roll) % 10 + 1

  playersScores[playersTurn] +=
    playersPositions[playersTurn];

  console.log(playersPositions, playersScores[playersTurn])
  playersTurn = ++playersTurn % 2;
  diceRolls += 3;
}


console.log(' Result: ' + (playersScores.reduce((a, b) => a < b ? a : b) * diceRolls))
