'use strict';

// sharing this dependency, for now
const Queue = require('../lib/queue.js');
const companyID = 'flowers-r-us';
const queue = new Queue(companyID);

queue.subscribe('package-delivered', (payload) => {
  console.log(payload);
  console.log('Flowers Were Delivered', payload.code);
});

queue.trigger('getall', 'package-delivered');


