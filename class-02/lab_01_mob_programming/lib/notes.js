function Notes(options) {
  this.action = options.command.action;
  this.payload = options.command.payload;
}

// Actually do something with the inputted command's action and payload
Notes.prototype.execute = function() {
  switch (this.action) {
  case 'add':
    this.add(this.payload);
    break;
  default:
    break;
  }
};

Notes.prototype.add = function(payload) {
  console.log(`adding note: ${payload}`);
};

module.exports = Notes;
