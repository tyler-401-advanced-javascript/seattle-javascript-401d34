// CLIENT
const inquirer = require('inquirer');
const io = require('socket.io-client');
const game = io.connect('http://localhost:3000/games');

game.emit('join', 'quickfingers');

game.on('joined', payload => {
  console.log('joined');
  go();
});

// On each play, check against the high score, and then win or not!
game.on('play', payload => {

  console.clear();
  console.log('Your Time:', payload.result, 'seconds');
  console.log('All time record:', payload.best, 'seconds');

  if ((payload.result < payload.best) || !(payload.best)) {
    console.log('');
    console.log('YOU WIN!');
    console.log('');
    game.emit('win', payload.result);
  }

  tryAgain();

});

// Get user input
async function go() {

  console.clear();

  console.log('How fast are your reflexes?')
  console.log('');
  console.log('1. When you are ready, press the <return> key')
  console.log('2. As fast as you can, press it again')
  console.log('');
  console.log('Try and beat the fastest time between keystrokes!')
  console.log('-------------------------------------------------')
  console.log('');

  let elapsed = 0;

  let questions = [
    {
      name: 'first',
      message: "Hit RETURN >",
      validate: () => {
        elapsed = Date.now();
        return true;
      }

    },
    {
      name: 'second',
      message: "AGAIN! >",
      validate: () => {
        elapsed = (Date.now() - elapsed) / 1000;
        return true;
      }
    }
  ];

  const response = await inquirer.prompt(questions);

  game.emit('play', elapsed);
}

async function tryAgain() {
  await inquirer.prompt([{ name: 'restart', message: 'Press <return> to restart' }]);
  go();
}