const events = require('./events')

const logger = {}

logger.save = payload => {
  console.log(payload)
}

logger.err = payload => {
  console.error(payload)
}

// add an events.on for file save that calls logger.save
events.on('save-file', logger.save)
// add an events.on for file error that calls logger.err
events.on('readwrite-error', logger.err)

module.exports = logger
