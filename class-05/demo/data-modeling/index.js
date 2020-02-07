'use strict';

const mongoose = require('mongoose');
const FoodCollection = require('./models/food-collection');

const MONGOOSE_URI = 'mongodb://localhost:27017/class05';

mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true });

let food = new FoodCollection();

const doDataStuff = async () => {

  let sampleObject = {
    name: 'Carrots',
    calories: 25,
    type: 'VEGETABLE'
  };

  let newFood = await food.create(sampleObject);
  console.log('Food Created', newFood);

  let allFood = await food.get();
  console.log('All Food', allFood);

  let oneFood = await food.get(newFood.id);
  console.log('One Food', oneFood);

  // Disconnect from Mongo
  mongoose.disconnect();

};

doDataStuff();
