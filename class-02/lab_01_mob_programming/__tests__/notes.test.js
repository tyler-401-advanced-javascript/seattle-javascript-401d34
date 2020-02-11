const Notes = require('../lib/notes.js');

jest.spyOn(global.console, 'log');

describe('Notes module', () => {
  // test for execute()
  // we want to make sure that the execute() function doesn't do anything if the user gave us garbage input
  it('execute() does nothing when the options are invalid', () => {
    const thisCommandWillFail = { command: { 'x': 'coconut' } };
    const notes = new Notes(thisCommandWillFail);
    notes.execute();
    expect(console.log).not.toHaveBeenCalled;
  });

  // test for add()
  it('Notes.prototype.add() can add a note', () => {
    const action = 'add';
    const payload = 'this will succeed';
    const notes = new Notes({ command: { action: action, payload: payload } });
    // we could have written this as { command: { action, payload } }
    notes.execute();
    expect(console.log).toHaveBeenCalledWith(`adding note: ${payload}`);
  });
});
