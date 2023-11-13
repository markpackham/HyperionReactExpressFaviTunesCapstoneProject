const express = require("express");
const router = express.Router();
const { register } = require("../controllers/userController");

// Middleware
const { checkEmailMiddleware } = require("../middleware/checkEmailMiddleware");
const {
  checkUsernameLengthMiddleware,
} = require("../middleware/checkUsernameLengthMiddleware");
const { checkUsernameUnique } = require("../middleware/checkUsernameUnique");

router.post(
  "/register",
  [checkEmailMiddleware, checkUsernameUnique, checkUsernameLengthMiddleware],
  register
);

module.exports = router;
