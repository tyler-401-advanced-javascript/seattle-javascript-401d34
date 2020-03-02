const EE = require('events')

const myEmitter = new EE()

myEmitter.on('makeHorse', () => {
  console.log({ name: 'horsey', maneColor: 'white' })
})

module.exports = myEmitter
