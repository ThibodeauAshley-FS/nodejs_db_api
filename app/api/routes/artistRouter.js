const express = require("express");
const { 
    getArtist, 
    createArtist , 
    deleteArtist , 
    updateArtist , 
    getArtistByID 
} = require("../../controllers/artistController.js");
const router = express.Router();


// GET: localhost:3000/artist
router.get("/", getArtist);

// POST: localhost:3000/artist
router.post("/", createArtist);

// GET BY ID: localhost:3000/artist/34
router.get("/:id", getArtistByID);

// PATCH BY ID: localhost:3000/artist/34
router.patch("/:id", updateArtist);

// DELETE BY ID: localhost:3000/artist/45
router.delete("/:id", deleteArtist);




module.exports = router;