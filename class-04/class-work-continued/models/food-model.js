const mongoose = require('mongoose');
const foodSchema = require('./food-schema.js');

const foodModel = mongoose.Schema(foodSchema);

module.exports = mongoose.model('food', foodModel);
