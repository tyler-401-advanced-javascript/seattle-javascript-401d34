const { server } = require('../lib/server')
// shorthand for { server: server }
// which in this context means
// const server = require('../lib/server').server
// in other words, get the "server" property out of the object that was exported from the lib/server file
// and assign it to the variable name "server"
const supertest = require('supertest')
const mockRequest = supertest(server)

describe('our server', () => {
  it('responds correctly on GET request to /authors', () => {
    return mockRequest
      .get('/authors')
      .then(results => {
        expect(results.status).toBe(200)
      })
      .catch(console.error)
  })

  it('adds another item on a POST request to /authors', () => {
    const newAuthor = { name: 'test author' }
    return mockRequest
      .post('/authors')
      .send(newAuthor)
      .then(results => {
        expect(results.status).toBe(201)
        expect(results.body.name).toEqual('test author')
      })
  })

  it('deletes an existing item on a DELETE request to /authors/:id', () => {
    return mockRequest.post('/authors').send({ id: '1', name: 'test' }).then(() => {
      return mockRequest
        .delete('/authors/1')
        .then(results => {
          expect(results.status).toBe(202)
        })
    })
  })
})
