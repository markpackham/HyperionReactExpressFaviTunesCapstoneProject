const Fav = require("../models/fav.model");

// CREATE
exports.create = async (req, res) => {
  try {
    const favModel = new Fav({
      trackId: req.body.trackId,
      trackName: req.body.trackName,
      artistName: req.body.artistName,
      kind: req.body.kind,
      trackViewUrl: req.body.trackViewUrl,
      longsDescription: req.body.longsDescription,
      releaseDate: req.body.releaseDate,
    });

    const saveFav = await favModel.save();

    console.log(saveFav);
    res.status(200).send("The fav media has been added");
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Some error occurred while creating the fav.",
    });
  }
};

// READ
exports.findAll = (req, res) => {
  Fav.find()
    .then((favs) => {
      res.send(favs);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "An error occurred while retrieving fav media",
      });
    });
};

// DELETE
exports.trackId = async (req, res) => {
  try {
    const trackId = req.params.trackId;
    const deleteResult = await Fav.deleteOne({ trackId: trackId });

    if (deleteResult.deletedCount > 0) {
      res.send("Successfully deleted the fav media.");
    } else {
      res.send("Fav media not found...");
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while removing the fav." });
  }
};
