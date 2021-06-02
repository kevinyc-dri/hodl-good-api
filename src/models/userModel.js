const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  uid: {
    type: String,
    unique: true,
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
    // coinname: {
    //   type: String,
    // },
    date: {
      type: String,
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