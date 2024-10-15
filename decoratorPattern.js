class Macbook {
  constructor() {
    this.cost = 977;
    this.size = 116;
  }

  getSize() {
    return this.size;
  }

  getCost() {
    return this.cost;
  }
}

class Memory extends Macbook {
  constructor(mb) {
    super();
    this.macbook = mb;
  }

  getCost() {
    return this.macbook.getCost() + 75;
  }
}

class Insurance extends Macbook {
  constructor(mb) {
    super();
    this.macbook = mb;
  }

  getCost() {
    return this.macbook.getCost() + 110;
  }
}

let mb = new Macbook();

mb = new Memory(mb);
mb = new Insurance(mb);
console.log(mb.getCost());
