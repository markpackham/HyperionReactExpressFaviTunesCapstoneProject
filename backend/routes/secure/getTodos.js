const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const todoController = require("../../controllers/todos.controller");
const { jsonCheckMiddleware } = require("../../middleware/jsonCheckMiddleware");
const {
  todoTooLargeMiddleware,
} = require("../../middleware/todoTooLargeMiddleware");
const {
  tokenCheckMiddleware,
} = require("../../middleware/tokenCheckMiddleware");

// POST
router.post(
  "/add",
  [todoTooLargeMiddleware, jsonCheckMiddleware, tokenCheckMiddleware],
  todoController.create
);

// DELETE
router.delete(
  "/delete-todo/:todo_id",
  tokenCheckMiddleware,
  todoController.deleteById
);

module.exports = router;
