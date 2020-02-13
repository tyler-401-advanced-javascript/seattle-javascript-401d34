const Notes = require('../lib/notes.js');
const notes = new Notes();

require('@code-fellows/supergoose');

jest.spyOn(notes, 'add');

describe('Note Module', () => {

  it('execute() does nothing with invalid options', () => {
    notes.execute({})
      .then(() => {
        expect(notes.add).not.toHaveBeenCalled();
      });
  });

  it('notes() can add a note', () => {
    notes.execute({ action: 'add', payload: 'thing' })
      .then(() => {
        expect(notes.add).toHaveBeenCalled();
      });
  });

});
