// Functions for Controlling Routes
const mongoose = require("mongoose");
const Artist = require('../models/artist.js')

exports.getArtist = async (req, res ) => {
    const artists = await Artist.find();
    res.status(200). json({
        data: artists,
        metadata: {
            method: `${req.method} - All Artist Request Made`,
            host: req.hostname
        }

    })
}

exports.getArtistByID = async (req, res ) => {
    const {id} = req.params;
    const artist = await Artist.findById(id);
        res.status(200). json({
            data: artist,
            metadata: {
                method: `${req.method} by ID`,
                host: req.hostname
            }
    
        })
};

exports.createArtist = async (req, res ) => {
    const newArtist = new Artist({
        _id: new mongoose.Types.ObjectId(),
        painting: req.body.painting,
        artist: req.body.artist
    });
    // Write to the db
    newArtist.save()
    .then( result => {
        console.log(result);

        res.status(200). json({
            message: "Artist Added!",
            artist: {
                painting: result.painting,
                artist: result.artist,
                id: result._id,
            },
            metadata: {
                method: req.method,
                host: req.hostname
            }
    
        })
    })
    .catch( err => {
        console.error(err.message);

        res.status(500).json({
            error: {
                message: err.message
            }
        });
    });
};

exports.updateArtist = async (req, res ) => {
    const {id} = req.params;
    const artist = await Artist.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        data: artist,
        status: "success ",
        message: `${req.method} - by ID made`,
    });

}
exports.deleteArtist = async (req, res ) => {
    const {id} = req.params;
    const artist = await Artist.findById(id);
    
    await Artist.findByIdAndDelete(id);
    res.status(200).json({
        id: id,
        artist: artist,
        status: "Success ",
        message: `${req.method} - by ID made`,
    });
};