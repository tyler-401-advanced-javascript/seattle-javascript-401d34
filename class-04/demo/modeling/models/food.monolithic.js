'use strict';

const Food = require('./food.model.js');

class FoodCollection {

  constructor() {
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(record) {
    let item = new Food(record);
    if (item) {
      this.database.push(item);
      return Promise.resolve(item);
    }
    else {
      return Promise.reject("invalid record");
    }
  }

  update(id, record) {
    this.database = this.database.map((item) => (item.id === id) ? record : item);
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

}

module.exports = FoodCollection;