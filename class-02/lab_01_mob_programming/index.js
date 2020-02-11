// require the files we're going to use
const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

const input = new Input();
const notes = new Notes(input);

// if we have valid input, then do note stuff, otherwise print help message
if (input.valid()) {
  notes.execute();
} else {
  help();
}

// help message
function help() {
  console.log('Leet hax0rs don\'t need Help');
  process.exit();
}
