const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  trackId: {
    type: String,
    required: true,
  },
  trackName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  trackViewUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Item", itemSchema);
