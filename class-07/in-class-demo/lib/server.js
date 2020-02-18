const express = require('express')
const app = express()

const authors = []

// Global middleware
app.use(express.json())

app.get('/authors', (req, res) => {
  res.status(200).json(authors)
})

app.post('/authors', (req, res) => {
  authors.push(req.body)
  res.status(201).json(req.body)
})

module.exports = {
  server: app,
  start: function (port) {
    const PORT = port || process.env.PORT || 3000
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  }
}
