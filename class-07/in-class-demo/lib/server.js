const express = require('express')
const app = express()

const authors = []

// Global middleware
app.use(express.json())
const logger = require('./logger')
app.use(logger)

app.get('/authors', (req, res) => {
  res.status(200).json(authors)
})

app.post('/authors', (req, res) => {
  authors.push(req.body)
  res.status(201).json(req.body)
})

app.delete('/authors/:id', (req, res) => {
  // const id = req.params.id
  const { id } = req.params
  const authorIndex = authors.findIndex(author => author.id === id)
  authors.splice(authorIndex, 1)
  res.status(202).json({})
})

app.get('/bad', (req, res) => {
  throw new Error('You done busted it up good')
})

const errorHandler = require('./errorHandler')
app.use(errorHandler)

module.exports = {
  server: app,
  start: function (port) {
    const PORT = port || process.env.PORT || 3000
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  }
}
