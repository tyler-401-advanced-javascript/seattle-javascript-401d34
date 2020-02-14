const mongoose = require('mongoose');
const MONGOOSE_URI = 'mongodb://localhost:27017/notesy';
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(MONGOOSE_URI, connectionOptions);

const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const input = new Input();
const notes = new Notes();

if (input.valid()) {
  notes.execute(input.command)
    .then(mongoose.disconnect)
    .catch(error => console.error);
} else {
  help();
}

function help() {
  console.log('Error!');
  process.exit();
}
