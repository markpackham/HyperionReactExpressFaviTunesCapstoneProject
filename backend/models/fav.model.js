// Connect to MongoDB so Fav model can send commands to create and delete favs
const mongoose = require("mongoose");

// fav media item so a book, movie, piece of music etc
const favSchema = mongoose.Schema({
  trackId: {
    type: Number,
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
  longDescription: {
    type: String,
    required: false,
  },
  releaseDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Fav", favSchema);
