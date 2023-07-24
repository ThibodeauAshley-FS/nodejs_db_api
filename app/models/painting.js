const mongoose = require("mongoose");


const paintingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    info: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Artist",
        required: true,
     },
    name: {
        type: String, 
        required: true,
     }
});

module.exports = mongoose.model("Painting", paintingSchema);