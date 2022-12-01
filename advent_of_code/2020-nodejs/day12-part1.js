const fs = require('fs');

const file = fs.readFileSync('./input/day12-input.txt', 'utf-8').split('\r\n');


// Start Solving

const ship = function () {
  this.coords = [0, 0];     // North / South, East / West
  this.angle = 90;

  this.instr_set = {
    N: (m) => this.coords[0] += m,
    S: (m) => this.coords[0] -= m,
    E: (m) => this.coords[1] += m,
    W: (m) => this.coords[1] -= m,

    // ship changes angle only by 90°
    // if angle bigger than 90 its south or wat, thus subtracting 
    F: (m) => this.coords[this.angle % 180 / 90] += m * (this.angle > 90 ? -1 : 1),

    // Wrap angle 720° back to 0° and so on...
    R: (m) => this.angle = (this.angle + m) % 360,
    // if the angle becomes negative then move it by 360° to the same positive angle
    L: (m) => this.angle = (m > this.angle ? this.angle - m + 360 : this.angle - m) % 360,

  }

  this.move = (instr) => this.instr_set[instr[0]](parseInt(instr.substring(1)));

  this.manhatten_dist = () => 'Manhatten Distance: ' + (Math.abs(this.coords[0]) + Math.abs(this.coords[1]))

}


let ferry = new ship();
file.forEach(instr => ferry.move(instr));
console.log(ferry.manhatten_dist());