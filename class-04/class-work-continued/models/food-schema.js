module.exports = {
  name: { type: String, required: true },
  type: {
    type: String,
    uppercase: true,
    enum: ['FRUIT', 'VEGETABLE', 'PROTEIN'],
  },
  calories: { type: Number, required: true },
};
