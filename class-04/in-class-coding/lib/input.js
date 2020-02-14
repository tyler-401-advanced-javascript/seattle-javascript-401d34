const minimist = require('minimist');
const Validator = require('./validator.js');

class Input {

  constructor() {
    const args = minimist(process.argv.slice(2));
    console.log(args);
    this.command = this.parse(args);
  }

  parse(args) {

    let argsMap = {
      a: 'add',
      add: 'add',
      d: 'delete',
      delete: 'delete',
      l: 'list',
      list: 'list',
    };

    let command = Object.keys(args).filter(arg => argsMap[arg])[0];

    return {
      action: argsMap[command],
      payload: typeof args[command] === 'string' ? args[command] : undefined,
      category: args.category || args.c,
    };
  }

  valid() {
    let schema = {
      action: { type: 'string', required: true },
    };
    let validator = new Validator(schema);
    return validator.isValid(this.command);
  }
}

module.exports = Input;
