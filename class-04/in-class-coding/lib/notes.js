const NotesModel = require('./notes-model.js')

class Notes {
  async execute (opts) {
    switch (opts.action) {
      case 'add':
        return this.add(opts.payload, opts.category)
      case 'list':
        return this.list(opts.payload)
      case 'delete':
        return this.delete(opts.payload)
      default:
        return Promise.resolve()
    }
  }

  async add (text, category) {
    const newNote = new NotesModel({
      text: text,
      category: category
    })
    const saved = await newNote.save()
    console.log('Created new note:', newNote.text)
    return saved
  }

  async delete (id) {
    await NotesModel.findByIdAndDelete(id)
      .then(() => console.log('Deleted Note ID', id))
  }

  async list (category) {
    const query = category ? { category } : {}
    const foundNotes = await NotesModel.find(query)
    foundNotes.forEach(note => {
      console.log(note.text)
      console.log(`  Category: ${note.category}\t ID: ${note.id}`)
      console.log('----------------------------------')
      console.log('')
    })
  }
}

module.exports = Notes
