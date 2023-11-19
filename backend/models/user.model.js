// Connect to MongoDB so User model can send commands to create users
const mongoose = require("mongoose");

// store jwt tokens in database to identify user
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
