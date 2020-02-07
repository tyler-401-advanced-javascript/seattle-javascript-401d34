// CLIENT
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000');

socket.on('error', (payload) => {
  console.error('ERROR:', payload);
});

socket.on('action', (payload) => {
  console.log('ACTION:', payload);
});
