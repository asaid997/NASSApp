const express = require('express')
const axios = require('axios')
const router = express.Router()

// 4KF2rKFNdJveQHmJMauagz6e4IldVSyz9I9Z26DR

const Image = require('../models/image')

router.get('/images', async function (request, response) {
    const data = await Image.find(request.body)
    response.send(data)
})


router.post(`/image`, async function (request, response) {
    const image = request.body
    const i = new Image(image)
    response.send(await i.save())
})

router.delete(`/image/:id`, async function (request, response) {
    const { id } = request.params
    const deleteStatus = await Image.find({ id }).deleteOne()
    response.send(`${deleteStatus.deletedCount}`)
})

module.exports = router