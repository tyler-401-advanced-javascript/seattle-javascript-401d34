function generateGetAll (type) {
  return (req, res, next) => {
    type.read()
      .then(result => {
        const output = {
          count: result.length,
          data: result
        }
        res.status(200).json(output)
      })
      .catch(next)
  }
}

function generatePost (type) {
  return (req, res, next) => {
    type.create(req.body)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
}

module.exports = {
  generateGetAll,
  generatePost
}
