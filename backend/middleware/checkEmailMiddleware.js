const checkEmailMiddleware = (req, res, next) => {
  // Regex for @gmail.com
  const emailRegex = /@gmail.com$/;

  const { username, password } = req.body;

  try {
    if (!emailRegex.test(username)) {
      res.status(403).send({ message: "403 Error Email must @gmail.com" });
    } else if (username.length > 140 || password.length > 140) {
      res.status(403).send({
        message: "403 Usernames & Passwords must be less than 140 characters",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkEmailMiddleware };
