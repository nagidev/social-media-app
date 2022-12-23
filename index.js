const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")

require('dotenv/config')

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'))

// Routes
app.get('/', (req, res) => {
    res.send("<h1>Server</h1>")
})
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))

// Connect to DB
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('DB connected.'))
    .catch(err => console.log('Failed to connect:\n', err))

// Start server
app.listen(port, () => console.log(`Listening at port ${port}`))
