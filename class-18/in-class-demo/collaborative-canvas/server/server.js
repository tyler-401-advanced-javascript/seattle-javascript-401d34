const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('drawing', data => socket.broadcast.emit('drawing', data))
})

server.listen(3000, () => console.log('socket.io server up on 3000'))
