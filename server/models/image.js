const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    id: String,
    title: String,
    imageUrl: String,
    description: String
})

const Image = mongoose.model('transactions', imageSchema)

module.exports = Image