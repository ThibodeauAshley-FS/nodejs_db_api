const express = require("express");
const router = express.Router();

// GET: localhost:3000/artist
router.get("/",(req,res, next)=>{
    res.json({
        message: "Artist.-.GET"
    });
});

// POST: localhost:3000/artist
router.post("/",(req,res, next)=>{
    res.json({
        message: "Artist.-.POST"
    });
});

// GET BY ID: localhost:3000/artist
router.get("/:artistId",(req,res, next)=>{
    const artistId = req.params.artistId;
    res.json({
        message: "Artist.-.GET",
        id: artistId
    });
});

// PATCH BY ID: localhost:3000/artist
router.patch("/:artistId",(req,res, next)=>{
    const artistId = req.params.artistId;
    res.json({
        message: "Artist.-.PATCH",
        id: artistId
    });
});

// DELETE BY ID: localhost:3000/artist/45
router.delete("/:artistId",(req,res, next)=>{
    const artistId = req.params.artistId;
    res.json({
        message: "Artist.-.DELETE",
        id: artistId
    });
});
module.exports = router;