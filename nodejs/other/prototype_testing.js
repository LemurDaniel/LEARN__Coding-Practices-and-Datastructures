

function Vehicle(name, tanksize = 20) {
    this.name = name;
    this.tank_size = tanksize;
    this.tank = 0;
}

Vehicle.prototype.bla = function() {

}



const vehicle_1 = new Vehicle('BlaBla');
console.log(vehicle_1.name);
console.log(vehicle_1.__proto__);
console.log(vehicle_1.__proto__.constructor)
console.log(Vehicle.prototype);
console.log('\n-------------------\n')


function Rocket(name, tank_size = 500) {
    Vehicle.call(this, name, tank_size);
}

Rocket.prototype = Object.create(Vehicle.prototype);
Rocket.prototype.constructor = Rocket;


const electron = new Rocket('Electron');
console.log(electron.name);
console.log(electron.__proto__.bla);
console.log(electron.__proto__.constructor)
console.log(Rocket.prototype.__proto__.constructor); // should be vehicle
console.log(electron.__proto__.__proto__.constructor);
console.log(electron.__proto__.__proto__.__proto__.constructor) // should be object
console.log('\n-------------------\n')