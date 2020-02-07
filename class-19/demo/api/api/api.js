'use strict';

const express = require('express');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/database');

const app = express();

const PORT = process.env.PORT || 3000

app.get('/things', getThings);
app.post('/things', createThing);
app.put('/things/:id', updateThing);
app.delete('/things/:id', deleteThing);

function getThings(req, res) {
  let things = {
    count: 2,
    results: [{}, {}]
  }
  res.status(200).send(things);
}

function createThing(req, res) {
  let thing = {};
  socket.emit('create', { clientID: 'api', payload: thing });
  res.status(200).send(thing);
}

function updateThing(req, res) {
  let thing = {};
  res.status(200).send(thing);
}

function deleteThing(req, res) {
  queue.trigger('package-delivered', message);
  res.status(200).send();
}

app.listen(PORT, () => console.log('API up on', PORT));