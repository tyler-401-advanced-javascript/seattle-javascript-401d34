const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    uppercase: true,
    enum: ['FRUIT', 'VEGETABLE', 'PROTEIN'],
  },
  calories: { type: Number, required: true },
});

module.exports = mongoose.model('food', foodSchema);
