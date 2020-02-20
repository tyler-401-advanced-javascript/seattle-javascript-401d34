const express = require('express')
const Users = require('../models/users')
const users = new Users()

const { generateGetAll, generatePost } = require('../lib/routeGenerators')

const router = express.Router()

router.get('/users', generateGetAll(users))
router.get('/users/:id', getOneUser)
router.post('/users', generatePost(users))
router.put('/users/:id', editUser)
router.delete('/users/:id', destroyUser)

function getOneUser (req, res, next) {
  users.read(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
}

function editUser (req, res, next) {
  users.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
}

function destroyUser (req, res, next) {
  users.delete(req.params.id)
    .then(result => {
      res.status(202).json(result)
    })
    .catch(next)
}

module.exports = router
