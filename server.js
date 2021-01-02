const express = require('express')
const app = express()
const api = require('./server/routes/api')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/nassa-data', { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/', api)

const port = 3001
app.listen(port, () => console.log("running on port " + port));