'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/database');

socket.emit('subscribe', { event: 'create', clientID: 'cache-manager' });
socket.emit('subscribe', { event: 'update', clientID: 'cache-manager' });
socket.emit('subscribe', { event: 'delete', clientID: 'cache-manager' });

socket.on('create', handleCreate);
socket.on('update', handleUpdate);
socket.on('delete', handleDelete);

socket.emit('getall', { event: 'create', clientID: 'cache-manager' });
socket.emit('getall', { event: 'update', clientID: 'cache-manager' });
socket.emit('getall', { event: 'delete', clientID: 'cache-manager' });

function handleCreate(data) {
  console.log('CREATE', data.payload);
  let response = {
    clientID: 'cache-manager',
    messageID: data.messageID,
    event: 'create'
  };
  socket.emit('received', response);
}

function handleUpdate(payload) {
  console.log('UPDATE', data.payload);
}

function handleDelete(payload) {
  console.log('DELETE', data.payload);
}


