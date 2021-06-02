require('./models/userModel')
require('./models/purchaseModel')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Purchase = mongoose.model('Purchase')

const mongoUri = process.env.DATABASE
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo')
})

app.listen('5000', () => {
  console.log('App is listening on port 5000')
})

app.get('/', (req, res) => {
  res.send('Welcome to Hodlgood Api')
})

app.get('/user/:email', (req, res) => {
  const { email } = req.params
  User.findOne({ email: email }).then(singleUser => res.status(200).json(singleUser))
    .catch((err) => console.log(err))
})

app.patch('/user/:email', (req, res) => {
  const { email } = req.params
  const { purchase } = req.body
  User.findOneAndUpdate({ email: email }, { purchase: purchase })
    .then(user => res.status(200).send(user))
    .catch((err) => console.log(err))
})

app.post('/signup', (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  const user = new User({ email, password })
  user
    .save()
    .then(() => {
      res.status(200).send('user was added')
    })
    .catch((err) => console.log(err))
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email })
    .then((userExists) => {
      // check if email and password is in object
      if (!email || !password) {
        return res
          .status(422)
          .send({ error: 'Must Provide email and password ' })
      }
      // check if email exists in db
      if (!userExists) {
        return res.status(404).send({ error: 'User not found' })
      }
    })
    .catch((err) => console.log(err))
})

app.post('/purchase', (req, res) => {
  const { coinname, date, quantity, price } = req.body
  // console.log(req.body)
  const purchase = new Purchase({ coinname, date, quantity, price })
  purchase
    .save()
    .then(() => {
      res.status(200).send('purchase was added')
    })
    .catch((err) => console.log(err))
})