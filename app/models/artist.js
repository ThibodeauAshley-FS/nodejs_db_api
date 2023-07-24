const mongoose = require("mongoose");


const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    painting: {
        type: String, 
        required: true,
     },
    artist: {
        type: String, 
        required: true,
     },
});

module.exports = mongoose.model("Artist", artistSchema);