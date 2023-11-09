const mongoose = require("mongoose");

// store jwt tokens in database
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_jwt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
