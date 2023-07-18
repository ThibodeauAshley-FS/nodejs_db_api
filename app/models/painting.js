const mongoose = require("mongoose");


const paintingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    painting: String,
    artist: String,
    year: Number,
});

module.exports = mongoose.model("Painting:", paintingSchema);