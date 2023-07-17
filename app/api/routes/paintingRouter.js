const express = require("express");
const { getPainting, createPainting, getPaintingByID, updatePainting, deletePainting } = require("../../controllers/paintingController");
const router = express.Router();

// GET: localhost:3000/painting
router.get("/", getPainting);

// POST : localhost:3000/painting
router.post("/",(createPainting));

// GET BY ID: localhost:3000/painting
router.get("/:id", getPaintingByID);

// PATCH BY ID: localhost:3000/painting/45
router.patch("/:id", updatePainting);

// DELETE BY ID : localhost:3000/painting/45
router.delete("/:id", deletePainting);

module.exports = router;