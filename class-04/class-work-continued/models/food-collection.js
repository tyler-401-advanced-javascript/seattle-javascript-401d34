const schema = require('./food-schema.js');

class Food {
  constructor() {}

  get(id) {
    return id ? schema.findById(id) : schema.find({});
  }

  create(record) {
    const newRecord = new schema(record);
    return newRecord.save();
  }

  delete(id) {
    return schema.findByIdAndDelete(id);
  }

  update(id, record) {
    return schema.findByIdAndUpdate(id, record, { new: true });
  }
}

module.exports = Food;
