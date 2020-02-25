function logger (req, res, next) {
  console.log('__REQUEST__', req.method, req.path)
  next()
}

module.exports = logger
