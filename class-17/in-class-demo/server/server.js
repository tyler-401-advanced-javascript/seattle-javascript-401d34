const net = require('net')
const server = net.createServer()

const PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(`Server up on ${PORT}`))

const socketPool = {}

server.on('connection', socket => {
  const id = `Socket-${Math.random()}`
  socketPool[id] = socket
  socket.on('data', buffer => doSomething(buffer))
  socket.on('error', e => console.error('SOCKET ERROR', e))
  socket.on('end', () => delete socketPool[id])
})

server.on('error', e => console.error('SERVER ERROR!', e))

function doSomething (buffer) {
  // This is pretty bare...we're assuming that the message's type doesn't matter
  // so let's extend it so that we can handle commands
  const message = JSON.parse(buffer.toString().trim())
  // we're calling this "message" but probably better to call it something else
  // because it might not be a message
  broadcast(message) // only if the event's eventType was 'message'
}

function broadcast (message) {
  const payload = JSON.stringify(message)
  for (const socket in socketPool) {
    socketPool[socket].write(payload)
  }
}
