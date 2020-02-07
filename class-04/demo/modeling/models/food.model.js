'use strict';

const uuid = require('uuid/v4');

const schema = {
  id: { required: true },
  name: { required: true },
  calories: { required: true },
};

class Food {
  constructor(record) {
    record.id = uuid();
    // This really should use your validator library, not a method here in the class
    if (this.isValid(record)) { return record; }
    else { return undefined; }
  }

  isValid(data) {
    // For the sake of simplicity, return true
    // This demo is about wiring, not the validator
    return true;
  }
}

module.exports = Food;