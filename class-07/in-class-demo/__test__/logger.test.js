const logger = require('../lib/logger')

describe('Logger middleware', () => {
  const req = {}
  const res = {}
  const next = jest.fn()



  it('properly logs some output', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    logger(req, res, next)
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('properly moves to the next middleware', () => {
    logger(req, res, next)
    expect(next).toHaveBeenCalled() // called with no arguments
  })
})
