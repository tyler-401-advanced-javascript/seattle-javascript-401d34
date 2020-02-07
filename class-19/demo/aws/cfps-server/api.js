'use strict';

const express = require('express');

const Queue = require('../lib/queue');
const queue = new Queue('api');

const app = express();

const PORT = process.env.PORT || 3000

app.post('/delivery/:retailer/:code', (req, res) => {

  if (!(req.params.retailer && req.params.code)) { throw "Invalid Delivery Params"; }

  const message = {
    retailer: req.params.retailer,
    code: req.params.code
  };

  queue.trigger('package-delivered', message);

  res.status(200).send(`${req.params.retailer} - ${req.params.code} Delivered ${new Date().toUTCString()}`)
});

app.listen(PORT, console.log(`API Server @ ${PORT}`));