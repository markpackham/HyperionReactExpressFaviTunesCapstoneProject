const express = require("express");
const router = express.Router();
const { albumInfo } = require("../controllers/albumController");

// GET example
// http://localhost:8080/favs/album-info?albumName=Greatest+Hits&artistName=Creed
router.get("/album-info", albumInfo);

module.exports = router;
