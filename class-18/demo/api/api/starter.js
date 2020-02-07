'use strict';

const net = require('net');
const express = require('express');

const app = express();

const client = new net.Socket();
client.connect(3001, 'localhost', () => { });

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

  let event = JSON.stringify({ event: 'create', payload: thing });
  client.write(event);

  res.status(200).send(thing);
}

function updateThing(req, res) {
  let thing = {};

  let event = JSON.stringify({ event: 'update', payload: thing });
  client.write(event);

  res.status(200).send(thing);
}

function deleteThing(req, res) {
  let event = JSON.stringify({ event: 'delete', payload: req.params.id });
  client.write(event);
  res.status(200).send();
}

app.listen(PORT, () => console.log('API up on', PORT));