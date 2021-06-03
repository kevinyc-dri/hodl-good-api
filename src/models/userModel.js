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
  }
})

mongoose.model('User', userSchema)