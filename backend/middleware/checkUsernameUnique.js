const User = require("../models/user.model");

const checkUsernameUnique = (req, res, next) => {
  const { username } = req.body;

  User.findOne({ username: username }).then((user) => {
    if (user) {
      res.status(403).send({ message: "Username already taken" });
    } else {
      next();
    }
  });
};

module.exports = { checkUsernameUnique };
