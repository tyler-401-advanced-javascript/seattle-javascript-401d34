const supergoose = require('@code-fellows/supergoose')
const { server } = require('../../src/app')
const mockRequest = supergoose(server)

describe('API server', () => {
  it('responds with 404 on an invalid route', () => {
    return mockRequest
      .get('/fail')
      .then(results => {
        expect(results.status).toBe(404)
      })
  })

  it('responds with 500 when an internal server error is raised', () => {
    return mockRequest
      .get('/this_will_error')
      .then(results => {
        expect(results.status).toBe(500)
      })
  })
})
