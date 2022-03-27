const jwt = require('jsonwebtoken')

const jsonToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '23h'
  })
}

module.exports = jsonToken