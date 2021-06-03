require('./models/UserModel')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')

const User = mongoose.model('User')

app.use(cors())
app.use(express.json())

const mongoUri = process.env.DATABASE
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo')
})
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err)
})
app.listen('5000', () => {
  console.log('App is listening on port 5000')
})
app.get('/', (req, res) => {
  res.send('Welcome to Hodlgood Api')
})
app.get('/users', (req, res) => {
  User.find().then((allUsers) => res.status(200).json(allUsers))
})
app.post('/signup', (req, res) => {
  const { email, uid } = req.body
  // console.log(req.body)
  const user = new User({ email, uid })
  user.save().then(() => {
    res.status(200).send('user was added')
  })
    .catch((err) => console.log(err))
})
app.post('/login', (req, res) => {
  const { email, uid } = req.body
  User.findOne({ email: email })
    .then((userExists) => {
      if (!email || !uid) {
        return res
          .status(422)
          .send({ error: 'Must Provide email and password ' })
      }
      // check if email and password is in object
      // check if email exists in db
      if (!userExists) {
        return res.status(404).send({ error: 'User not found' })
      }
      res.send(userExists)
    })
    .catch((err) => console.log(err))
})

