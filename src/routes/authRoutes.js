const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const User = mongoose.model('User')

router.post('/signup', (req, res) => {
  const { email, uid } = req.body
  const user = new User({ email, uid })

  user.save().then(() => {
      res.status(200).send('user was saved')
    }).catch((err) => console.log(err))
})
