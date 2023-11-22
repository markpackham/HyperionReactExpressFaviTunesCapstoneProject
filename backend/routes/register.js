const express = require("express");
const router = express.Router();
const { register } = require("../controllers/userController");

// Middleware
const { checkEmailMiddleware } = require("../middleware/checkEmailMiddleware");
const { checkUsernameUnique } = require("../middleware/checkUsernameUnique");

router.post("/register", [checkEmailMiddleware, checkUsernameUnique], register);

module.exports = router;
