const fs = require('fs');
const readline = require('readline');

// const input = fs.readFileSync('input/day05-input-test.txt', 'utf-8').split('\r\n');
const input = fs.readFileSync('input/day05-input.txt', 'utf-8').split('\r\n');



class Vector {

  static get Origin() {
    return new Vector(0, 0);
  }

  static sub(vec1, vec2) {
    return new Vector(vec1.x, vec1.y).sub(vec2);
  }

  get mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  get heading() {
    const TAU = Math.PI * 2;

    // 90° or 270°
    if (this.x === 0)
      return this.y > 0 ? (Math.PI / 2) : (Math.PI * 3 / 2);

    if (this.x > 0)
      return (TAU + Math.atan(this.y / this.x)) % TAU;

    if (this.x < 0)
      return Math.PI + Math.atan(this.y / this.x);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }


}

//////////////////////

const diagramm = {};
let overlappingLinesCount = 0;

function moveAlongLine(vec1, vec2) {

  // console.log(Vector.sub(vec2, vec1))
  // console.log(Vector.sub(vec2, vec1).heading / (Math.PI * 2) * 360)

  const heading = Vector.sub(vec2, vec1).heading;
  const [start, end] = [vec1, vec2];

  for (let x = 0, y = 0, i = 0;
    x !== end.x || y !== end.y; i++) {

    x = Math.round(Math.cos(heading)) * i + start.x;
    y = Math.round(Math.sin(heading)) * i + start.y;

    if (Number.isNaN(x + y)) break;

    const point = [x, y]
    if (point in diagramm) {
      if (diagramm[point]++ === 1) overlappingLinesCount++;
    } else {
      diagramm[point] = 1;
    }
  }
}


for (const line of input) {

  const points = line.replace(' -> ', ',').split(',').map(v => parseInt(v));
  const vec = new Vector(points[0], points[1]);
  const vec2 = new Vector(points[2], points[3]);
  moveAlongLine(vec, vec2);
}


// console.log(diagramm)
console.log('Number of overlapping Points: ' + overlappingLinesCount)