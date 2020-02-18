const mongoose = require('mongoose')

const notes = mongoose.Schema({
  category: {
    type: String,
    required: false,
    default: 'uncategorized'
  },
  text: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('notes', notes)
