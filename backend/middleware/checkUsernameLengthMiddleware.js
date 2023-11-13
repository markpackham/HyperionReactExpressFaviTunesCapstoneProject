// Don't allow usernames or passwords longer than 140 characters to enter the database
const checkUsernameLengthMiddleware = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;

  try {
    if (username.length > 140 || password.length > 140) {
      res.status(400).send({
        message:
          "400 Usernames and Emails must not be longer than 140 characters.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkUsernameLengthMiddleware };
