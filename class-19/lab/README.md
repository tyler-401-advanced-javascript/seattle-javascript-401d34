# LAB: Message Queues

Compose a Message Queue server and client that monitors database events, and then modifying our API server to fire events into that Queue on all CRUD operations in our models.

## Before you begin

Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

## Requirements

Build a set of applications to simulate a delivery service

> **Code Fellows Parcel Service** (CFPS)

- An API server that handles incoming requests from drivers when a package has been delivered
- A Queue Server Hub that
  - Is alerted by the API server when a delivery has been made
  - Broadcasts "Delivery Confirmations" to retailers
- Client Applications that retailers would run, which subscribe to the Queue so that they can be alerted when a delivery was made

### API Server

- Create a server application in express called `cfps-server`
- Connect the server to your Message Queue Server
- Listen for 1 Route:
  - POST on /delivery/:retailer/:code
  - Where :retailer is the name of our client and :code is a unique tracking code
  - i.e. <http://localhost:3000/delivery/1800-flowers/12345-ABCD>
- When the route is accessed by a client (POSTMAN or `httpie`), emit an event to the Queue Server
  - Event Name: `package-delivered`
  - Payload: Object Containing the delivery information

  ```javascript
  {
    retailer: '1800-flowers',
    code: '12345-ABCD'
  };
  ```

### Message Queue Server

- Create a new node application called `queue-server`
- Create an undelivered queue for storing queued messages
- Add an event handler for `package-delivery`
- When this event is triggered ...
  - Broadcast the same event, with the following payload to all connected clients

    ```javascript
    {
      messageID: "Unique-Message-ID,
      payload: ORIGINAL.PAYLOAD
    }
    ```

  - Any event broadcast to a client that does not get delivered should be added to the appropriate queue for the client
- Add an event a client can trigger to fetch each undelivered message for an event to which they have subscribed
- Add an event a client can trigger to fetch the next undelivered message (in proper order) for an event to which they have subscribed

> How will you track each client's receipt of messages sent so you can remove them from the queue?

### Client Applications

- Create a 2 applications that subscribe to the `package-delivered` event
  - `acme-widgets`
  - `flowers-r-us`
- On startup, your client applications should request all events from the server that are in your queue (events/messages you've not yet received)
- Upon handling any `package-delivered` event
  - Log a custom message to the console
  - Let the queue server know that your application handled this event (message id) so that it can de-queue it

## CODE QUALITY / ENGINEERING GOALS

Rather than simply putting all of the required logic in every file, create a Queue class library that you can include in each of the applications (api, clients) to uniformly communicate, subscribe, etc with the Queue server. Endeavor to make integrating new client applications easy.

For example, this would be the ideal code for a client subscriber application, rather than having to manage every feature, in every app.

```javascript
const Queue = require('./lib/queue.js');
const companyID = 'flowers-r-us';
const queue = new Queue(companyID);

queue.subscribe('package-delivered' delivered);
queue.trigger('getall', 'package-delivered');

function delivered(payload) {
  console.log('Flowers Were Delivered', payload.code);
}
```

### Testing - Basic HTTP

- Start all 3 servers
  - API Server
  - Queue Server
  - Client Application Servers
- Use Postman, RESTy, or `httpie` to test your API Server
  - Send a POST request to your server to send delivery notifications
    - ie.
      - <http://localhost:3000/delivery/acme-widgets/123>
      - <http://localhost:3000/delivery/acme-widgets/abc>
      - <http://localhost:3000/delivery/flowers-r-us/567>
      - <http://localhost:3000/delivery/acme-widgets/xyz>
  - If successful ...
    - Your API server should notify the Queue Server
    - The Queue Server should broadcast a message
    - Your application servers should show your custom console logs
- Stop one of your applications servers
  - Re-Send some requests to your API that the server should have handled
  - This should leave some undelivered messages
  - Re-Start the application server
    - It should do an immediate request of all queued messages and log them out normally

#### Web Server Visual Tests

- Open this [React Application](https://5ctmj.csb.app/)
- In the form at the top of the page, choose a retailer and enter a fake tracking number
- Submit the form
- This will POST to `/delivery` on <http://localhost:3000> and simulate a delivery
- If your lab is working, this app will show your queued responses in the correct columns
  - If you leave the website and do manual POSTS as before and then re-visit the website
    - The website will attempt to `getall` from your queue

## Assignment Submission Instructions

Refer to the the [Submitting Express Server Lab Submission Instructions](../../../reference/submission-instructions/labs/express-servers.md) for the complete lab submission process and expectations
