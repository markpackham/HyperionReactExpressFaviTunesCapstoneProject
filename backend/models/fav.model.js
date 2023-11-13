const mongoose = require("mongoose");

const favSchema = mongoose.Schema({
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
  longsDescription: {
    type: String,
    required: false,
  },
  releaseDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Fav", favSchema);
