const User = require("../models/user.model");

const checkUsernameUnique = (req, res, next) => {
  const { username } = req.body;

  try {
    User.findOne({ username: username })
      .then((user) => {
        if (user) {
          return res.status(403).send({ message: "Username already taken" });
        } else {
          next();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkUsernameUnique };
