const mongoose = require('mongoose');
const dessertSchema = require('./dessert-schema.js');

const dessertModel = mongoose.Schema(dessertSchema);

module.exports = mongoose.model('dessert', dessertModel);
