'use strict';

// sharing this dependency, for now
const Queue = require('../lib/queue.js');

const companyID = 'acme-widgets';
const queue = new Queue(companyID);

queue.subscribe('package-delivered', (payload) => {
  console.log(payload);
  console.log('Widgets Were Delivered', payload.code);
});

queue.trigger('getall', 'package-delivered');


