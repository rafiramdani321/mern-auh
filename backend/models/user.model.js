const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verfied: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'user',
    required: true
  },
  refresh_token: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('User', userSchema)