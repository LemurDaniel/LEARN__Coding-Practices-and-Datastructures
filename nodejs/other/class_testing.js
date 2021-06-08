

class Vehicle {

    constructor(name, tank_size = 20){
        this.name = name;
        this.tank_size = tank_size;
        this.tank = 0;
    }

    bla() {

    }
}



const vehicle_1 = new Vehicle('BlaBla');
console.log(vehicle_1.name);
console.log(vehicle_1.__proto__);
console.log(vehicle_1.__proto__.constructor)
console.log(Vehicle.prototype);
console.log('\n-------------------\n')


class Rocket extends Vehicle {
    
    constructor(name, tank_size = 500) {
        super(name, tank_size);
    }

}


const electron = new Rocket('Electron');
console.log(electron.name);
console.log(electron.__proto__.bla);
console.log(electron.__proto__.constructor)
console.log(Rocket.prototype.__proto__.constructor); // should be vehicle
console.log(electron.__proto__.__proto__.constructor)
console.log(electron.__proto__.__proto__.__proto__.constructor) // should be object
console.log('\n-------------------\n')