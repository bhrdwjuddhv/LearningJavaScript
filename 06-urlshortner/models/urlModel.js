const mongoose = require('mongoose');
const { Schema } = mongoose;
const urlSchema = new Schema(
    {
        redirectUrl: {
            type: String,
            required: true,
        },
        shortId: {
            type: String,
            required: true,
            unique: true
        },
        visitHistory: [{timestamp: {type: Number}}]


    },{timestamps:true},
)
const URL = mongoose.model('url', urlSchema);
module.exports = URL;