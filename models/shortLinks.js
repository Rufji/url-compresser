var mongoose = require("mongoose")
var shortId = require("shortid")

var shortLinksSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("shortLinks", shortLinksSchema)