const foodSchema = require('./food-schema.js');

module.exports = {
  ...foodSchema,
  sprinkles: { type: Boolean, default: false },
  frosting: { type: Boolean, default: true },
  alcoholic: { type: Boolean, default: false },
};
