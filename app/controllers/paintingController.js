// Functions for Controlling Routes
const mongoose = require("mongoose");
const Painting = require('../models/painting')

exports.getPainting = async (req, res ) => {
    const paintings = await Painting.find();
    res.status(200). json({
        data: paintings,
        metadata: {
            method: `${req.method} - All Painting Request Made`,
            host: req.hostname
        }

    })
}

exports.getPaintingByID = async (req, res ) => {
    const {id} = req.params;
    const painting = await Painting.findById(id);
        res.status(200). json({
            data: painting,
            metadata: {
                method: `${req.method} by ID`,
                host: req.hostname
            }
    
        })
};

exports.createPainting = async (req, res ) => {
    const newPainting = new Painting({
        _id: new mongoose.Types.ObjectId(),
        painting: req.body.painting,
        artist: req.body.artist,
        year: req.body.year
    });
    // Write to the db
    newPainting.save()
    .then( result => {
        console.log(result);

        res.status(200). json({
            message: "Painting Added!",
            painting: {
                painting: req.body.painting,
                artist: req.body.artist,
                year: req.body.year,
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

exports.updatePainting = async (req, res ) => {
    const {id} = req.params;
    const painting = await Painting.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        data: painting,
        status: "success ",
        message: `${req.method} - by ID made`,
    });

}
exports.deletePainting = async (req, res ) => {
    const {id} = req.params;
    const painting = await Painting.findById(id);
    res.status(200).json({
        id: id,
        data:painting,
        status: "Success ",
        message: `${req.method} - by ID made`,
    });

    await Painting.findByIdAndDelete(id);
};