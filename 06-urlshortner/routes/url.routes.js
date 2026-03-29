const express = require('express');
const { HandleGenerateNewShortUrl } = require('../controllers/url.controllers');
const router = express.Router();

router.post('/', HandleGenerateNewShortUrl)

module.exports = router;