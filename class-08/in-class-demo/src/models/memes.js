const Model = require('./mongo-model')
const schema = require('./memes-schema')

class Memes extends Model {
  constructor () {
    super(schema)
  }
}

module.exports = Memes
