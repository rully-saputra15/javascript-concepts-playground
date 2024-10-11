/**
 * 
 * The Factory pattern can be beneficial when applied to the following situations:

When our object or component setup involves a high level of complexity.

When we need a convenient way to generate different instances of objects depending on the environment we are in.

When we’re working with many small objects or components that share the same properties.

When composing objects with instances of other objects that need only satisfy an API contract (aka, duck typing) to work. This is useful for decoupling.
 */

class Car {
  constructor({ doors = 4, color = "yellow", state = "new" }) {
    this.doors = doors;
    this.color = color;
    this.state = state;
  }
}

class Truck {
  constructor({ wheelSize = "large", state = "used", color = "black" }) {
    this.wheelSize = wheelSize;
    this.state = state;
    this.color = color;
  }
}

class VehicleFactory {
  constructor() {
    this.vehicleClass = Car;
  }
  createVehicle(options) {
    const { vehicleType, ...rest } = options;

    switch (vehicleType) {
      case "car":
        this.vehicleClass = Car;
        break;
      case "truck":
        this.vehicleClass = Truck;
        break;
      default:
        this.vehicleClass = Car;
        break;
    }
    return new this.vehicleClass(rest);
  }
}

const carFactory = new VehicleFactory();
const car = carFactory.createVehicle({
  vehicleType: "car",
  color: "green",
  doors: 5,
});

console.log(car instanceof Car);
console.log(car);
