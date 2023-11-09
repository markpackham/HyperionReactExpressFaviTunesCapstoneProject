const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwt_key = process.env.JWT_KEY;

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  // See if user exists in DB if so send a jwt
  User.findOne({ username: username, password: password })
    .then((user) => {
      if (!user) {
        return res.send("Incorrect user credentials");
      }
      const payload = {
        name: username,
      };
      const token = jwt.sign(JSON.stringify(payload), jwt_key, {
        algorithm: "HS256",
      });
      res.send({
        message: `Welcome back ${username} please add some todos!`,
        token: token,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "Error",
      });
    });
};

// REGISTER
exports.register = async (req, res) => {
  const payload = {
    name: req.body.username,
  };

  // Create token
  const token = jwt.sign(JSON.stringify(payload), jwt_key, {
    algorithm: "HS256",
  });

  try {
    const userModel = new User({
      username: req.body.username,
      password: req.body.password,
      user_jwt: token,
    });

    const saveUser = await userModel.save();
    console.log(saveUser);

    res.status(200).send("User added");
  } catch (error) {
    // Error response
    console.error(error);
    res.status(500).send({
      message: "Some error occurred while creating the todo.",
    });
  }
};
