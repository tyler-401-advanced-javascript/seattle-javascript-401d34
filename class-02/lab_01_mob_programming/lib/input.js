const minimist = require('minimist');

function Input() {
  let args = minimist(process.argv.slice(2));
  // args will look like { a: 'Hello world' }
  this.command = this.parseInput(args);
  // when we initialize an Input object, it will run the parseInput function over the args that were provided on the command line
}

Input.prototype.parseInput = function(args) {
  let possibleArguments = {
    a: 'add',
    add: 'add',
    // ultimately we'll add "d: 'delete', etc."
  };
  let allArguments = Object.keys(args);
  // so if the user said "-a 'Hello'" allArguments will be ['_', 'a']
  let keyOfArgument = allArguments.filter(arg => possibleArguments[arg])[0];
  // iterate through ['_', 'a']
  // see if that string exists as a key on the possibleArguments
  // then take the first one that does
  return {
    action: possibleArguments[keyOfArgument],
    payload: args[keyOfArgument],
  };
  // so we'll return an object that looks like:
  // { action: 'add', payload: 'Hello world' }
};

Input.prototype.valid = function() {
  // return true if the input is valid, return false if invalid
  // a valid input is defined as an object with an action and a payload
  // and is stored in this.command (see the constructor function)
  // a well-formed command will look like { action: 'add', payload: 'hello' }
  // we need to check if action exists, if payload exists AND if payload is not the boolean true
  if (this.command.action && this.command.payload && this.command.payload !== true) {
    return true;
  }
  return false;
};

module.exports = Input;
