const express = require("express");
const router = express.Router();

// GET: localhost:3000/painting
router.get("/",(req,res, next)=>{
    res.json({
        message: "Painting.-.GET"
    });
});

// POST : localhost:3000/painting
router.post("/",(req,res, next)=>{
    res.json({
        message: "Painting.-.POST"
    });
});

// GET BY ID: localhost:3000/painting
router.get("/:paintingId",(req,res, next)=>{
    const paintingId = req.params.paintingId;
    res.json({
        message: "Painting.-.GET",
        id: paintingId
    });
});

// PATCH BY ID: localhost:3000/painting/45
router.patch("/:paintingId",(req,res, next)=>{
    const paintingId = req.params.paintingId;
    res.json({
        message: "Painting.-.PATCH",
        id: paintingId
    });
});

// DELETE BY ID : localhost:3000/painting/45
router.delete("/:paintingId",(req,res, next)=>{
    const paintingId = req.params.paintingId;
    res.json({
        message: "Painting.-.DELETE",
        id: paintingId
    });
});

module.exports = router;