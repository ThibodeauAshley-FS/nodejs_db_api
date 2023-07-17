// Functions for Controlling Routes
const mongoose = require("mongoose");
const Artist = require('../models/artist.js')

exports.getArtist = async (req, res ) => {
    res.status(200).json({
        message: ""
    });
};

exports.getArtistByID = async (req, res ) => {
    res.status(200).json({
        message: "Artist.-.POST"
    });
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

    const updateArtist = {
        painting: req.body.painting,
        artist: req.body.artist

    };

    Artist.updateOne({ _id: id }, {
        $set: updateArtist
    })
    .then( result => {
        res.status(200). json({
            message: "Artist Updated!",
            artwork: {
                painting: req.body.painting,
                artist: req.body.artist,
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
exports.deleteArtist = async (req, res ) => {
    const {id} = req.params;
    res.status(200).json({
        message: "Artist.-.DELETE",
        id: id
    });
};