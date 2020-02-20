const mongoose = require('mongoose')

const memesSchema = mongoose.Schema({
  template: { type: String },
  textBoxes: { type: [String] },
  imageUrl: { type: String }
})

module.exports = mongoose.model('memes', memesSchema)
