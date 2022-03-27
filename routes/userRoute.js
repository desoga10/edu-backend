//All APIS COME HERE
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const jsonWebToken = require('../utils/jsonWebToken')

router.post('/register', asyncHandler(async (req, res) => {

  const { email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User Already Exists')
  }
  const user = await User.create({
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: jsonWebToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
}))

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: jsonWebToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
}))


module.exports = router