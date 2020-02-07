'use strict';

module.exports = (io) => {

  // Games Namespace
  const games = io.of('/games');

  const scores = {};

  games.on('connection', (socket) => {

    console.log('Welcome to the Game Server!', socket.id);

    let currentGame = '';

    socket.on('join', game => {

      socket.join(game);

      currentGame = game;

      // goes to all connected sockets (server wide)
      io.emit('action', `Someone joined the game: ${game}`);
      games.to(`${socket.id}`).emit('joined', game);

    });

    socket.on('win', (payload) => {
      scores[currentGame] = payload;
      games.to(currentGame).emit('win', `New High Score: ${payload}`); // All Gamers
    });

    socket.on('play', (payload) => {
      let message = {
        result: payload,
        best: scores[currentGame]
      }
      // This uses my socket id, so it goes only to sender
      games.to(`${socket.id}`).emit('play', message);
    });

  });

}

