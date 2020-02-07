'use strict';

const inquirer = require('inquirer');
const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => { });

let name = '';
const messages = [];

function sendMessage(text) {
  console.log('sending', text);
  let message = `[${name}]: ${text}`;
  let event = JSON.stringify({ event: 'message', payload: message });
  client.write(event);
}

// What we do when the server gives us data back
client.on('data', function (data) {
  let event = JSON.parse(data);
  // Ignore anythign that's not clearly a chat.
  // Remember, our server might be dealing events from games, databases, etc
  if (event.event === "message") {
    messages.push(event.payload);
    console.clear();
    messages.forEach(message => console.log(message));
    console.log('');
  }
});


// Get Input
async function getInput() {
  let input = await inquirer.prompt([{ 'name': 'text', 'message': ' ' }])
  sendMessage(input.text);
  getInput();
}

// Get their name
async function getName() {
  console.clear();
  let input = await inquirer.prompt([{ 'name': 'name', 'message': 'What is your name?' }])
  name = input.name;
}

getName();
getInput();
