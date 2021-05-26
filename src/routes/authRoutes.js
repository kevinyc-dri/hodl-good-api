const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const User = mongoose.model('User')

router.post('/signup', (req, res) => {
  const { email, password } = req.body

  const user = new User({ email, password })

  user.save().then(() => {
    console.log('user was saved')
  }).catch(err => console.log(err))
})