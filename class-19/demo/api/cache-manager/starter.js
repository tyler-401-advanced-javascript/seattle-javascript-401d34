'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/database');

socket.on('create', handleCreate);
socket.on('update', handleUpdate);
socket.on('delete', handleDelete);

function handleCreate(data) {
  console.log('CREATE', data.payload);
}

function handleUpdate(payload) {
  console.log('UPDATE', data.payload);
}

function handleDelete(payload) {
  console.log('DELETE', data.payload);
}


