const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const favController = require("../controllers/favs.controller");

// READ
router.get("/", favController.findAll);

module.exports = router;
