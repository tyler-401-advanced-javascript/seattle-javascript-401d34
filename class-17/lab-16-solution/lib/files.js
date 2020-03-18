const fs = require('fs')
const util = require('util')

const events = require('./events')
require('./logger')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const files = {}

files.loadFile = file => readFile(file)

files.saveFile = (file, buffer) => writeFile(file, buffer)

files.convertBuffer = buffer => {
  // should take in a buffer and return a new Buffer
  // which has the capitalized contents of the input buffer
  return Buffer.from(buffer.toString().trim().toUpperCase())
}

files.alterFile = async file => {
  try {
    const fileBuffer = await files.loadFile(file)
    const uppercasedBuffer = files.convertBuffer(fileBuffer)
    await files.saveFile(file, uppercasedBuffer)
    const status = {
      status: 0,
      file: file,
      message: 'saved properly'
    }
    events.emit('save-file', status)
  } catch (e) {
    const status = {
      status: 1,
      file: file,
      message: e.message
    }
    events.emit('readwrite-error', status)
  }
}

module.exports = files
