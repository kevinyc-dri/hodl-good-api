const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
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
})

mongoose.model('Purchase', userSchema)