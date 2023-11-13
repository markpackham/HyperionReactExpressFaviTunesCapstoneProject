const Todo = require("../models/fav.model");

// CREATE
exports.create = async (req, res) => {
  try {
    const favModel = new Todo({
      trackId: req.body.trackId,
      trackName: req.body.trackName,
      artistName: req.body.artistName,
      kind: req.body.kind,
      trackViewUrl: req.body.trackViewUrl,
      longsDescription: req.body.longsDescription,
      releaseDate: req.body.releaseDate,
    });

    const saveFav = await favModel.save();

    console.log(saveTodo);
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
  Todo.find()
    .then((todos) => {
      res.send(todos);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "An error occurred while retrieving fav media",
      });
    });
};

// DELETE
exports.deleteById = async (req, res) => {
  try {
    const todo_id = req.params.todo_id;
    const deleteResult = await Todo.deleteOne({ todo_id: todo_id });

    if (deleteResult.deletedCount > 0) {
      res.send("Successfully deleted the todo.");
    } else {
      res.send("Todo not found...");
    }
  } catch (error) {
    console.error("An error occurred while removing the todo.", error);
    res
      .status(500)
      .send({ message: "An error occurred while removing the todo." });
  }
};
