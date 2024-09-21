const mongoose = require('mongoose')
require('dotenv').config()

// Connect DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// validasi
const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error: "))
db.once('open', () => console.log('Connected to MongoDB'))