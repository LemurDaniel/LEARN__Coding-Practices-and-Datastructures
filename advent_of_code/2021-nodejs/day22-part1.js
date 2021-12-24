const fs = require('fs');

let input;

input = fs.readFileSync('./input/day22-input-test.txt', 'utf-8').split('\r\n');
input = fs.readFileSync('./input/day22-input.txt', 'utf-8').split('\r\n');


input = input.map(line => {
  const [state, coords] = line.split(' ');

  return coords.split(',').map(axis =>
    axis.substring(2).split('..').map(v => Number(v))
  ).concat(state)
})



const REACTOR = {};


function processRebootStep([[x1, x2], [y1, y2], [z1, z2], state]) {

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      for (let z = z1; z <= z2; z++) {
        const pos = [x, y, z];
        if (state === 'on')
          REACTOR[pos] = true;
        else
          delete REACTOR[pos];
      }
    }
  }

}

for (let i = 0; i < input.length; i++) {
  const step = input[i];
  if (step[0][0] > 50 || step[0][0] < -50) break;
  if(i % 1 === 0) console.log('processed ' + i + ' reboot steps. ')
  processRebootStep(step)
}

console.log('Number of cubes turned on: ' + Object.keys(REACTOR).length)