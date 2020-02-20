jest.mock('minimist')
const minimist = require('minimist')

minimist.mockImplementation(() => {
  return {
    a: 'This is a note'
  }
})

const Input = require('../lib/input.js')

describe('Input Module', () => {
  it('parse() creates a good object', () => {
    const options = new Input()
    const command = options.parse({ a: 'test' })
    expect(command.action).toBeDefined()
    expect(command.payload).toBeDefined()
  })

  it('valid() respects a proper object', () => {
    const options = new Input()
    expect(options.valid()).toBeTruthy()
  })

  it('valid() rejects an invalid object', () => {
    const options = new Input()
    options.command = {} // break it
    expect(options.valid()).toBeFalsy()
  })
})
