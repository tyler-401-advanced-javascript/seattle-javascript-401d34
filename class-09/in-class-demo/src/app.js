// Third-party resources
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// App-level middleware
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

const Memes = require('./models/memes')
const memes = new Memes()
const Users = require('./models/users')
const users = new Users()
// What we basically want is that /<model> ends up using the right model
function getModel (req, res, next) {
  const model = req.params.model
  // How can we get the right model into the req.params function?
  switch (model) {
    case 'memes':
      req.model = memes
      next()
      break
    case 'users':
      req.model = users
      next()
      break
    default:
      throw new Error('Invalid Model')
  }
}

// Routes
app.param('model', getModel)
app.get('/:model', handleGetAll)
app.post('/:model', handlePost)

function handleGetAll (req, res, next) {
  req.model.read()
    .then(result => {
      const output = {
        count: result.length,
        data: result
      }
      res.status(200).json(output)
    })
    .catch(next)
}

function handlePost (req, res, next) {
  req.model.create(req.body)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
}

// Routes
// const memesRouter = require('./api/memesRouter')
// app.use(memesRouter)
// const usersRouter = require('./api/usersRouter')
// app.use(usersRouter)

app.get('/this_will_error', (req, res) => {
  throw new Error('yo dawg I heard you like errors so I put some error in your errors so you can error while you error')
})

// Catch-alls
const notFoundHandler = require('./middlewares/404')
app.use(notFoundHandler)
const internalServerErrorHandler = require('./middlewares/internalServerErrorHandler')
app.use(internalServerErrorHandler)

let isRunning = false

module.exports = {
  server: app,
  start: function (port) {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true
        console.log(`Server listening on port ${port}...`)
      })
    } else {
      console.error('Server is already running!')
    }
  }
}
