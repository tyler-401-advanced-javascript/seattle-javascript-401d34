const net = require('net')
const inquirer = require('inquirer')

const client = new net.Socket()
// client.connect initiates a TCP connection
// to tcp://uri:port
// client.connect(3001, 'localhost') --> tcp://localhost:3001
client.connect(3001, 'localhost', () => {})

let name
const messages = []

function sendMessage (text) {
  let message
  // if the message looks like "/me smiles" treat it as an emote
  // should output: Emily smiles
  // Otherwise treat the message as a chat message
  // should output: <Emily> hello, world
  if (text.substr(0, 4) === '/me ') {
    message = `${name} ${text.substr(4)}`
  } else {
    message = `<${name}> ${text}`
  }
  const event = JSON.stringify({
    eventType: 'message',
    payload: message
  })
  client.write(event)
}

// One way you might handle commands on the client...
// handle commands that look like "/time" by stripping the initial slash
// and sending an event of type 'command' with the payload
// function sendCommand (text) {
//   const command = text.substring(1)
//   const event = JSON.stringify({
//     eventType: 'command',
//     payload: command
//   })
//   client.write(event)
// }

client.on('data', data => {
  const event = JSON.parse(data)
  // What if the eventType was not 'message'?
  if (event.eventType === 'message') {
    messages.push(event.payload)
    console.clear()
    messages.forEach(message => console.log(message))
    console.log('')
  }
})

async function getName () {
  console.clear()
  const input = await inquirer.prompt([{ name: 'name', message: 'What is your name?' }])
  name = input.name
}

async function getInput () {
  const input = await inquirer.prompt([{ name: 'text', message: ' ' }])
  if (input[0] === '/') {
    // if the first character of the input is a slash, it's not a message, it's a command
    // sendCommand(input.text) // for example
  }
  sendMessage(input.text)
  getInput()
}

getName()
getInput()
