// Class representing a generic mongoose model
class Model {
  constructor (schema) {
    this.schema = schema
  }

  create (record) {
    const newRecord = new this.schema(record) // eslint-disable-line
    return newRecord.save()
  }

  read (id) {
    const queryObject = id ? { _id: id } : {}
    return this.schema.find(queryObject)
  }

  update (id, record) {
    return this.schema.findByIdAndUpdate(id, record, { new: true })
  }

  delete (id) {
    return this.schema.findByIdAndDelete(id)
  }
}

module.exports = Model
