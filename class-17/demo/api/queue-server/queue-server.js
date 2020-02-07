'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`));

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('error', (e) => { console.log('SOCKET ERROR', e); });
  socket.on('end', (e) => { delete socketPool[id]; });
});

server.on('error', (e) => {
  console.error('SERVER ERROR', e.message);
});

function dispatchEvent(buffer) {
  let message = JSON.parse(buffer.toString().trim());
  // Right now, this is "dumb", just sending out the messages to everyone
  // How might we handle more complex events and maybe chat commands?
  broadcast(message);
}

// Need to loop over every socket connection and manually
// send the message to them
function broadcast(message) {
  // Message is an object with 2 props: event and payload
  // We can use those to handle every event type and payload differently, if we choose
  let payload = JSON.stringify(message);
  for (let socket in socketPool) {
    socketPool[socket].write(payload)
  }
}


