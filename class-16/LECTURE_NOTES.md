# Event-Driven Programming and The Node Event System

## What is an Event?
An event is something that, when it happens, something that's listening for that event is triggered to perform some action.

### We've seen this before:

- Browser events: `button.addEventListener('click', function () { doSomething() })` runs the callback function whenever the button receives a 'click' event.
- In jQuery: `$(.myButton).on('hover', makeComputerExplode)`: run the `makeComputerExplode` callback function when the object with class `myButton` receives a 'hover' event.
- In Node/Express: `app.get('/horses', (req, res) => { res.json(allHorses) })` run the callback function whenever the server gets a GET request on the specified route `/horses`

What's actually happening? The JavaScript language is "listening" for specific events and firing off responses/triggers/whatever you want to call them whenever it "hears" them.

### In Node.js
Node has its own event system built in:
```javascript
const EventEmitter = require('events'); // this is a built-in Node module

const myEmitter = new EventEmitter(); // instantiate a new emitter

myEmitter.on('event', () => { // here, 'event' is the name of the event
  console.log('an event occurred!'); // what to do when this event occurs
});
```
So here, when we do this:
```javascript
myEmitter.emit('event');
```
We get the `console.log` from above.

In computing this is often called the "observer" pattern or the "publish/subscribe" model. One party "publishes" an event, and another party "subscribes" to it. Neither party has any knowledge of the contents of the other, they're participating, as it were, in some kind of blindfolded conversation:
- "Something just happened!"
- "Cool, thanks for letting me know!"
