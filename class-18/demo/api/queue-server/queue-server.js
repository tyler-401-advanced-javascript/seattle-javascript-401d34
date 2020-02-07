'use strict';

const uuid = require('uuid').v4;
const io = require('socket.io')(3001);

io.on('connection', (socket) => {
  console.log('Connected', socket.id);
});

io.of('/database', (socket) => {

  // --------------------------------------------------- //
  // Database Event Handlers
  // --------------------------------------------------- //

  socket.on('create', (message) => handleEvent('create', message));
  socket.on('update', (message) => handleEvent('update', message));
  socket.on('delete', (message) => handleEvent('delete', message));

  // Our events are all pretty much the same other than their name
  // Other applications might need separate handlers for each
  // event type, though.

  function handleEvent(event, message) {

    let messageID = uuid();

    // Re-Send the messages
    // This would go to every connected client for this event
    socket.broadcast.emit(event, { messageID, payload: message.payload });

  };

});