const fs = require('fs');

const file = fs.readFileSync('./input/day12-input.txt', 'utf-8').split('\r\n');

//const test = 'F10 N3 F7 R90 F11'.split(' ');

// Start Solving

const ship = function () {
  this.crd_ship = [0, 0];     // North / South, East / West
  this.crd_way = [1, 10];
  this.angle = 90;

  this.karth_to_pol = (c) => {
    angle = Math.atan2(c[0], c[1]) / (2*Math.PI) *360;
    len = Math.sqrt(c[0]*c[0] + c[1]*c[1]);
    return [ angle < 0 ? angle+360:angle  , len]
  }
  
  this.pol_to_karth = (c) => {
      angle = c[0] / 360 * 2 * Math.PI;
      x = Math.round(Math.cos(angle) * c[1]);
      y = Math.round(Math.sin(angle) * c[1]);
      return [y, x]
  }

  this.addVectors = (v1, v2) => [v1[0]+v2[0], v1[1]+v2[1]];
  this.subVectors = (v1, v2) => [v1[0]-v2[0], v1[1]-v2[1]];

  // set origin to 0,0 by subtracting position of ship
  this.get_wp_to_origin = () => this.subVectors(this.crd_way, this.crd_ship);
  // get position relative to ship by adding ships coordinates
  this.get_wp_to_ship = () => this.addVectors(this.crd_way, this.crd_ship);

  // Convert to polarcoordinates, change angle and then convert back to carth
  this.rotate = (angle) => { 
    pol = this.karth_to_pol(this.get_wp_to_origin());
    pol[0] += angle + (angle > pol[0] ? 360:0);
    this.crd_way = this.addVectors(this.crd_ship, this.pol_to_karth(pol));
  } 

  this.forward = (dist) => {
    rel_wp = this.get_wp_to_origin(); 
    pol = this.karth_to_pol(rel_wp);
    ship_delta = this.pol_to_karth([pol[0], pol[1]*dist]); // Relative movement to origin
    this.crd_ship = this.addVectors(this.crd_ship, ship_delta); // add delta to actual postion
    this.crd_way = this.addVectors(this.crd_ship, rel_wp); // move waypoint relative to ship
  } 

  this.instr_set = {
    N: (m) => this.crd_way[0] += m,
    S: (m) => this.crd_way[0] -= m,
    E: (m) => this.crd_way[1] += m,
    W: (m) => this.crd_way[1] -= m,
    R: (a) => this.rotate(-a),  // X-Axis is 0°, movement right is negativ angles
    L: (a) => this.rotate(a),   // movment left is positive angles
    F: (dst) => this.forward(dst), 
  }

  this.move = (instr) => this.instr_set[instr[0]](parseInt(instr.substring(1)));

  this.manhatten_dist = () => 'Manhatten Distance: ' + (Math.abs(this.crd_ship[0]) + Math.abs(this.crd_ship[1]))

}


let ferry = new ship();
file.forEach( instr => ferry.move(instr));
console.log(ferry);
console.log(ferry.manhatten_dist());
