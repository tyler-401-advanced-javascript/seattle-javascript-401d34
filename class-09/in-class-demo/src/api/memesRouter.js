const express = require('express')
const Memes = require('../models/memes')
const memes = new Memes()

const { generateGetAll, generatePost } = require('../lib/routeGenerators')

const router = express.Router()

router.get('/memes', generateGetAll(memes))
router.get('/memes/:id', getOneMeme)
router.post('/memes', generatePost(memes))
router.put('/memes/:id', editMeme)
router.delete('/memes/:id', destroyMeme)

function getOneMeme (req, res, next) {
  memes.read(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
}

function editMeme (req, res, next) {
  memes.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
}

function destroyMeme (req, res, next) {
  memes.delete(req.params.id)
    .then(result => {
      res.status(202).json(result)
    })
    .catch(next)
}

module.exports = router
