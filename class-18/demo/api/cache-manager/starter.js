'use strict';

'use strict';

const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => { });

client.on('data', function (data) {
  let event = JSON.parse(data);
  // Only log certain events
  if (event.event === "create") { handleCreate(event.payload); }
  if (event.event === "update") { handleUpdate(event.payload); }
  if (event.event === "delete") { handleDelete(event.payload); }
});

client.on('close', function () {
  console.log('Connection closed');
});

function handleCreate(payload) {
  console.log('CREATE', payload);
}

function handleUpdate(payload) {
  console.log('UPDATE', payload);
}

function handleDelete(payload) {
  console.log('DELETE', payload);
}


