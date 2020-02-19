const Model = require('./mongo-model')
const schema = require('./users-schema')

class Users extends Model {
  constructor () {
    super(schema)
  }
}

module.exports = Users
