// CLIENT
const inquirer = require('inquirer');
const io = require('socket.io-client');
const slick = io.connect('http://localhost:3000/slick');

let channel = '#general';

// We're going to use the variable "channel" to let us move (reconnect)
// between rooms in the "slick" namespace on our server hub
slick.emit('join', channel);

// Update our global channel variable
slick.on('joined', (joinedChannel) => {
  channel = joinedChannel;
});

// When the server sends out a list of all messages, render them
slick.on('messages', payload => {
  console.clear();
  payload.forEach(message => console.log(message))
  console.log("---------");
  beSlick();
});

// When the server sends out just one message
slick.on('message', payload => {
  // We could manage our own list of messages by room her in the client
  // How can we stay in sync with the server, though?
  // What if we log out and then back in again?
})

// Get user input
async function beSlick() {

  const response = await inquirer.prompt([
    {
      name: 'text',
      message: `${channel} >`
    }
  ]);

  // Pull out the first 4 chars of the input to find exit or join
  // No, this is not scalable ...
  //   ... how can this be improved or extendable?
  let command = response.text.toLowerCase().split('', 4).join('');

  // Given a command, either deal with it, or send the message
  switch (command) {
    case 'quit':
      process.exit();
      break;
    case 'join':
      let room = response.text.split(' ')[1] || channel; // default to the current channel
      slick.emit('join', room);
      break;
    default:
      slick.emit('message', response.text)
      break;
  }

}
