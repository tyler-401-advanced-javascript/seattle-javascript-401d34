'use strict';

const uuid = require('uuid').v4;
const io = require('socket.io')(3001);

/*
We need to track the delivery of our messages.  Create a holder for them, with this shape
so that we can deliver messages by event, by client and easily find/delete them.
{
  "eventname": {
    "clientID": {
      "messageID": PAYLOAD,
      "messageID": PAYLOAD,
    },
  },
}
*/
const messages = {};

io.on('connection', (socket) => {
  console.log('Connected', socket.id);
});

/*
Every message must have a common format now. They can't just be raw text
Why? We need to categorize events in a queue of some kind to know which
clients have received which events. So, we'll enforce a contract to make
sure that we can properly communiate back and forth.

Inbound message payload must be an object like this:

{
  clientID: 'unique client id',
  payload: 'Actual Message Payload'
}

The 'payload' can be anthing -- string, array, etc. It'll always be passed back as such

Messages broadcast back to the clients from the server would also have some shape:

{
  messageID: 'unique-message-id',
  payload: 'Original Message payload'
}

*/

io.of('/database', (socket) => {

  // When a client receives and processes an event, they must tell the server
  // Then, we can remove it from their "queue" so that any subsequent
  // "getall" or "getnext" would not include things the client already dealt with
  socket.on('received', payload => {
    let { messageID, event, clientID } = payload;
    delete messages[event][clientID][messageID];
  });

  // On a "getall", anything in the queue for a user, for an event gets re-sent
  socket.on('getall', (data) => {
    try {
      let { event, clientID } = data;
      for (const messageID in messages[event][clientID]) {
        let payload = messages[event][clientID][messageID];
        // io.in(room) sends to anyone in that "room"
        // So on a getall, we don't blindly broadcast to all connected folks
        console.log('sending to', clientID, event)
        io.of('database').to(clientID).emit(event, { messageID, payload });
      }
    }
    catch (e) { console.error(e); }
  });

  // Clients really can't just do an "on" if they want to be in a queue
  // They need to register themselves as a subscriber, so that
  // the server can track what messages they've seen
  socket.on('subscribe', payload => {
    let { event, clientID } = payload;

    // Set Up the queue for their message
    // This could/should be a function call!
    if (!messages[event]) { messages[event] = {}; }
    if (!messages[event][clientID]) { messages[event][clientID] = {}; }

    // If we put each client in their own "Room" we can keep their queue for them
    // and then it only goes to them when they reconnect or getall...
    socket.join(clientID);

  });

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

    // What is message? It's got extra properties in it from the
    // Queue library, so we'll need to only actually re-broadcast
    // the .payload within it.  Do a console.log() to see the whole thing

    let messageID = uuid();

    // Log that we trired to send each user a message
    for (const subscriber in messages[event]) {
      messages[event][subscriber][messageID] = message.payload;
    }

    // Send them all out
    // This would go to every connected client for this event
    socket.broadcast.emit(event, { messageID, payload: message.payload });

  };

  // WHAT IF WE WANTED THIS SERVER TO NEVER HAVE TO WIRE SPECIFIC EVENTS
  // In other words ... a generic event handler so that anything that it
  // does not specifically need to monitor can just be passed through

  // --------------------------------------------------- //
  // Cool! Generic middleware that can be a catchall
  // We don't have to wire up EVERY kind of event!
  // YUCK! You have to do your own skipping, though
  // ... then call .next() to keep going
  // --------------------------------------------------- /

  // socket.use((packet, next) => {

  //   let event = packet[0];
  //   let message = packet[1];

  //   // Skip the events we manually wired up. Yuck
  //   if (event.match(/received|getall|subscribe/)) { return next(); }

  //   // What is message? It's got extra properties in it from the
  //   // Queue library, so we'll need to only actually re-broadcast
  //   // the .payload within it.  Do a console.log() to see the whole thing

  //   let messageID = uuid();

  //   // Log that we trired to send each user a message
  //   for (const subscriber in messages[event]) {
  //     messages[event][subscriber][messageID] = message.payload;
  //   }

  //   // Send them all out
  //   socket.broadcast.emit(event, { messageID, payload: message.payload });

  // });



});
