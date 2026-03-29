const URL = require('../models/urlModel.js');
const { randomIdGenerator } = require('./randomIdGenerator.js');
async function HandleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).send({
            error: 'Missing URL',
        })
    }
    const shortID = randomIdGenerator(6);
    await URL.create({
        shortId: shortID,
        redirectUrl:body.url,
        visitHistory: []

    })
    return res.json({
        id: shortID,
    })
}

module.exports = { HandleGenerateNewShortUrl }