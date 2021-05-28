const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  signupDate: {
    type: String,
  },
  purchase: {
    coinname: {
      type: String,
      unique: true,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
    },
    price: {
      type: String,
    },
  }
})

mongoose.model('User', userSchema)