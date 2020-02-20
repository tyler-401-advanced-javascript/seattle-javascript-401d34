const Memes = require('../../../src/models/memes')
require('@code-fellows/supergoose')

const memes = new Memes()

describe('Memes model', () => {
  it('can create() a new meme', () => {
    const testObject = {
      template: 'Galaxy Brain',
      textBoxes: ['one', 'two', 'three', 'four'],
      imageUrl: 'http://example.com/memes.jpg'
    }
    return memes.create(testObject)
      .then(record => {
        Object.keys(testObject).forEach(key => {
          if (testObject[key] instanceof Array) {
            Object.keys(testObject[key]).forEach(subKey => {
              expect(record[key][subKey]).toEqual(testObject[key][subKey])
            })
          } else {
            expect(record[key]).toEqual(testObject[key])
          }
        })
      })
      .catch(err => console.error('ERROR:', err))
  })
})
