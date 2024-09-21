const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const Route = require('./routes/user')
// const { default: NotFound } = require('../frontend/src/components/NotFound')
require('dotenv').config()
require('./config/db')

// setup middlware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())

// set Routes
app.use('/', Route)

// Server run
const port = process.env.PORT
app.listen(port, () => console.log(`Server running on port ${port}`))