class Transport {
    constructor(name) {
        if (new.target === Transport) {
            throw new Error("Cannot instantiate abstract class Transport directly");
        }
        this.name = name;
    }

    ride() {
        throw new Error("ride() must be implemented");
    }

    stop() {
        throw new Error("stop() must be implemented");
    }
}

class Car extends Transport {
    constructor() {
        super('Car');
    }

    ride() {
        console.log(`${this.name} is driving...`);
    }

    stop() {
        console.log(`${this.name} has stopped.`);
    }
}

class Bike extends Transport {
    constructor() {
        super('Bike');
    }

    ride() {
        console.log(`${this.name} is riding...`);
    }

    stop() {
        console.log(`${this.name} has stopped.`);
    }
}

class TransportFactory {
    static createTransport(type) {
        switch (type) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            default:
                throw new Error(`Unknown transport type: ${type}`);
        }
    }
}

const car = TransportFactory.createTransport('car');
car.ride();
car.stop();

const bike = TransportFactory.createTransport('bike');
bike.ride();
bike.stop();
