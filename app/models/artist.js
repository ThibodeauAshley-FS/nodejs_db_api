const mongoose = require("mongoose");


const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    painting: String,
    artist: String,
});

module.exports = mongoose.model("Artist:", artistSchema);