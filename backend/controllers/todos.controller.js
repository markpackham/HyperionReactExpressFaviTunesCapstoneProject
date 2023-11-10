const Todo = require("../models/todo.model");

exports.create = async (req, res) => {
  try {
    const todoModel = new Todo({
      todo_id: req.body.todo_id,
      todo_name: req.body.todo_name,
      todo_description: req.body.todo_description,
    });

    const saveTodo = await todoModel.save();

    // Success res
    console.log(saveTodo);
    res.status(200).send("The todo has been added");
  } catch (error) {
    // Error res
    console.error(error);
    res.status(500).send({
      message: "Some error occurred while creating the todo.",
    });
  }
};

exports.findAll = (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send(todos);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "An error occurred while retrieving todos",
      });
    });
};

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
