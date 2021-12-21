const fs = require('fs');

Array.prototype.add = function add(array) {
  for (let i = 0; i < this.length; i++) {
    this[i] += array[i];
  }
  return this;
}


const MINIMUM_SCORE = 21;
const USE_CACHE = true;
const CACHE = {};

function splitUniverse(pl1Pos, pl2Pos, turn = 0, pl1Score = 0, pl2Score = 0) {

  if (pl1Score >= MINIMUM_SCORE) return [1, 0];
  if (pl2Score >= MINIMUM_SCORE) return [0, 1];

  const cacheKey = [pl1Pos, pl2Pos, turn, pl1Score, pl2Score].join('-');
  if (cacheKey in CACHE && USE_CACHE) return CACHE[cacheKey];

  let result = [0, 0];
  for (let i = 0; i < 27; i++) {

    const roll1 = i % 3 + 1;
    const roll2 = Math.floor(i / 3) % 3 + 1;
    const roll3 = Math.floor(i / 9) % 3 + 1;

    if (turn === 0) {
      const pos = (pl1Pos - 1 + roll1 + roll2 + roll3) % 10 + 1;
      const split = splitUniverse(pos, pl2Pos, (turn + 1) % 2, pl1Score + pos, pl2Score);
      result.add(split);
    } else if (turn === 1) {
      const pos = (pl2Pos - 1 + roll1 + roll2 + roll3) % 10 + 1;
      const split = splitUniverse(pl1Pos, pos, (turn + 1) % 2, pl1Score, pl2Score + pos);
      result.add(split);
    }

  }

  CACHE[cacheKey] = result;
  return result;
}


// const result = splitUniverse(4, 8);
const result = splitUniverse(4, 7);
console.log(`\n   Player 1 wins in ${result[0]} universes, Player 2 wins in ${result[1]} universes.\n`);