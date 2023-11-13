const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const favController = require("../../controllers/favs.controller");
const { jsonCheckMiddleware } = require("../../middleware/jsonCheckMiddleware");
const {
  tokenCheckMiddleware,
} = require("../../middleware/tokenCheckMiddleware");

// POST
router.post(
  "/add",
  [jsonCheckMiddleware, tokenCheckMiddleware],
  favController.create
);

// DELETE
router.delete(
  "/delete-fav/:trackId",
  tokenCheckMiddleware,
  favController.trackId
);

module.exports = router;
