// Functions for Controlling Routes
const mongoose = require("mongoose");
const Artist = require('../models/artist.js');
const painting = require("../models/painting.js");
const messages = require("../messages/messages");


exports.getArtist = async (req, res ) => {
    const artist = await Artist.find();
    res.status(200). json({
        data: artist,
        metadata: {
            method: `${req.method} - All Artist Request Made`,
            host: req.hostname
        }

    })
}

exports.getArtistByID = async (req, res ) => {
    const {id} = req.params;
    Artist.findById(id)
    .exec()
    .then(artist=> {
        if (!artist){
            console.log(painting);
            return res.status(404).json({
                message: messages.painting_not_found,
            })
        }
        Artist.findById(artist)
        res.status(200). json({
            data: artist,
            metadata: {
                method: `${req.method} by ID`,
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

exports.createArtist = async (req, res ) => {
    Artist.find({
        painting: req.body.painting,
        artist: req.body.artist
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0) {
            return res.status(406).json({
                message: "Duplicate: Item already in database"
            })
        }
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
        })
    .catch( err => {
        console.error(err);
        res.status(500).json({error: {
            message: `Unable to save ${err}`
        }})
    }

    )

};

exports.updateArtist = async (req, res ) => {
    const {id} = req.params;
    Artist.findById(id)
    .exec()
    .then( artist => {
        if (!artist){
            console.log(painting);
            return res.status(404).json({
                message: messages.painting_not_found,
            })
        }
       
        Artist.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            data: artist,
            status: "success ",
            message: `${req.method} - by ID made`,
        });
        

    })
    .catch( err => {
        console.error(err.message);

        res.status(500).json({
            error: {
                message: err.message
            }
        });
    });

}


exports.deleteArtist = async (req, res ) => {
    const {id} = req.params;
    Artist.findById(id)
    .exec()
    .then( artist => {
        if (!artist){
            console.log(painting);
            return res.status(404).json({
                message: messages.painting_not_found,
            })
        }

        Artist.findByIdAndDelete(id);
        res.status(200).json({
            id: id,
            artist: artist,
            status: "Success ",
            message: `${req.method} - by ID made`,
        });

    })

};