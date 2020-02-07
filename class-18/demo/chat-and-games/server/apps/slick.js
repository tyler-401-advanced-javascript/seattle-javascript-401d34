'use strict';

// Built after the core demo, to show namespaces and rooms
// Using the "slick" namespace to separate slick connections from others like games
// Using "rooms" to indicate which channel they are chatting in
// Using a simple system of event names to make this hub generic
// Effectively, the hub here, just regurgitates the message back to the clients

module.exports = (io) => {

  // Slick Namespace
  const slick = io.of('/slick');

  const messages = {};

  slick.on('connection', (socket) => {

    console.log('Welcome to the Slick Chat Server!', socket.id);

    let currentRoom = '';

    // When a user joins a new room, all of their chatting will happen there only
    socket.on('join', room => {
      socket.join(room);
      currentRoom = room;

      // Create the messages list
      if (!messages[currentRoom]) { messages[currentRoom] = []; }

      console.log('joined room', room);
      // io.emit --- seen by anyone connected to the non-namespaced server above
      io.emit('action', `Someone joined the room: ${room}`);
      // This uses my socket id, so it goes only to sender
      slick.to(`${socket.id}`).emit('joined', room)
      slick.to(`${socket.id}`).emit('messages', messages[room])

    });

    // Goes only to specific slick
    socket.on('message', (payload) => {
      // This uses the "slick" connection (the neamespace). emitting here goes to everyone, including sender

      // Add the message to the list of messages in this room
      messages[currentRoom].push(payload);

      // Broadcast out the full message list so clients can refresh
      slick.to(currentRoom).emit('messages', messages[currentRoom]);

      // Broadcast out just the last one, if clients want to do their own management
      slick.to(currentRoom).emit('message', payload);

      // This uses sender's socket. emitting here goes to everyone but sender
      // socket.to(currentRoom).emit('message', payload);
    });

  });

}

