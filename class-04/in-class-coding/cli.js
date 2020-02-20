#!/usr/bin/env node
const mongoose = require('mongoose')
const MONGOOSE_URI = 'mongodb://localhost:27017/notesy'
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(MONGOOSE_URI, connectionOptions)

const Input = require('./lib/input.js')
const Notes = require('./lib/notes.js')

const input = new Input()
const notes = new Notes()

if (input.valid()) {
  notes.execute(input.command)
    .then(mongoose.disconnect)
    .catch(error => console.error(error))
} else {
  help()
}

function help () {
  console.log(`Notesy usage:
notesy -a|--add "<note text>" [-c|--category <name>]
  Adds a note to the specified category
  N.B.: the note text must be enclosed in quotation marks
notesy -l|--list [category]
  Lists all notes and their IDs (optional: in the specified category)
notesy -d|--delete <id>
  Delete the specified note by ID`)
  process.exit()
}
