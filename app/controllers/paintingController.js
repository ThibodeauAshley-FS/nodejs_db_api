// Functions for Controlling Routes
const mongoose = require("mongoose");
const Painting = require('../models/painting');
const messages = require("../messages/messages");
const painting = require("../models/painting");

exports.getPainting = async (req, res ) => {
    Painting.find()
    .select("name info _id")
    .populate("info")
    .exec()
    .then( painting => {
        // if null return a message
        if (!painting){
            console.log(painting);
            return res.status(404).json({
                message: messages.empty_database,
            })
        }
       
            res.status(200).json({
                painting: painting,
                metadata: {
                    method: `${req.method} - All Painting Request Made`,
                    host: req.hostname
                }
            })
        
    })
    .catch(err => {
        res.status(500).json({error: {
            message: err.mesage
        }})
    })
}

exports.getPaintingByID = async (req, res ) => {
    const {id} = req.params;
    Painting.findById(id)
    .select("name info _id")
    .populate("info")
    .exec()
    .then( painting => {
        // if null return a message
        if (!painting){
            console.log(painting);
            return res.status(404).json({
                message: messages.painting_not_found,
            })
        }
       
            res.status(201).json({
                painting: painting
            })
        
    })
    .catch(err => {
        res.status(500).json({error: {
            message: err.mesage
        }})
    })
};
exports.createPainting = async (req, res ) =>{
    Painting.find({
        name: req.body.name
    })
    .exec()
    .then(result => {
        console.log(result);
        if (result.length >0 ){
            return res.status(406).json({
                message: messages.duplicate_item
            })
        }
        const newPainting = new Painting({
            _id: new mongoose.Types.ObjectId(),
            info: req.body.info,
            name: req.body.name
        });
        newPainting.save()
        .then(result => {
            console.log(result);

            res.status(200).json({
                message: "Painting Added",
                Painting: {
                    id: result._id,
                    info: {
                        painting: result.info.name,
                        artist:result.info.artist
                    },
                    name: result.name
                },
                metadata: {
                    method: req.method,
                    host: req.hostname
                }
            })
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

    Painting.deleteOne({
        _id: id
    })
    .exec()
    .then( result => {
        res.status(200).json({
            message: "Painting Deleted",
            resquest: {
                method: "GET",
                url: "http://localhost:3000/painting/", id
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
};