const express = require('express');
require('dotenv').config(); // load env variables
const mongoose = require('mongoose');
const PORT = 8000;
const app = express();
const URL = require('./models/urlModel')
const urlRoute = require('./routes/url.routes.js');
const { ConnectToMongo } = require('./connect');

// Middleware (IMPORTANT)
app.use(express.json()); // for JSON body parsing
app.use(express.urlencoded({ extended: false }));

// Connect DB
ConnectToMongo(process.env.MONGODB_URL)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.log('❌ Connection Failed', err));

// Routes
app.get('/:shortId', async (req, res) =>  {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId: shortId,
    },{
        $push: {
            viewHistory: [{timestamp: Date.now()}]
        }
    })
    res.redirect(entry.redirectUrl);
})
app.use("/url", urlRoute);

// Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});