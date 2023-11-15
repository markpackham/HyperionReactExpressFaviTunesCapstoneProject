// Connect to database using password in .env
const dotenv = require("dotenv");
dotenv.config();
const password = process.env.MONGODB_PASSWORD;

// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// Use helmet to mitigate cross-site scripting attacks, learned from
// Helmet (no date) npm.
// Available at: https://www.npmjs.com/package/helmet#content-security-policy (Accessed: 15 November 2023).
const helmet = require("helmet");

// Import routes
const addDeleteFavs = require("./routes/secure/addDeleteFavs");
const getAlbumInfo = require("./routes/getAlbumInfo");
const getFavs = require("./routes/getFavs");
const login = require("./routes/login");
const register = require("./routes/register");

const app = express();

// Initialize middleware
app.use(cors());
// Allow app to accept json and url encoded values
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// Global error handler middleware
// ensures that server doesn't crash on unhandled exceptions
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Set up port for server to listen on
const PORT = process.env.PORT || 8080;

const uri = `mongodb+srv://graveofmine99:${password}@hyperiondevlearning.dpl6f6p.mongodb.net/?retryWrites=true&w=majority`;

// Connect to db
mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => {
    console.log("Successfully connected to the database!");
  },
  (err) => {
    console.log("Could not connect to the database..." + err);
  }
);

// Set up routes to be handled from: http://localhost:8080/favs
app.use("/favs", getAlbumInfo);
app.use("/favs", getFavs);
app.use("/favs", login);
app.use("/favs", register);
app.use("/favs", addDeleteFavs);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
