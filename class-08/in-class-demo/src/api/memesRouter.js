const express = require('express')
const Memes = require('../models/memes')
const memes = new Memes()

const router = express.Router()

router.get('/memes', getAllMemes)
router.get('/memes/:id', getOneMeme)
router.post('/memes', postMeme)
router.put('/memes/:id', editMeme)
router.delete('/memes/:id', destroyMeme)

function getAllMemes (req, res, next) {
  memes.read()
    .then(result => {
      const output = {
        count: result.length,
        data: result
      }
      res.status(200).json(output)
    })
    .catch(next)
}

function getOneMeme (req, res, next) {
  memes.read(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
}

function postMeme (req, res, next) {
  memes.create(req.body)
    .then(result => {
      res.status(201).json(result)
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
