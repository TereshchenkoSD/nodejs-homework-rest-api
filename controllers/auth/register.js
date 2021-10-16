const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Already registered");
  }

  const newAvatar = gravatar.url(email, { s: "200" }, true);

  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.setAvatar(newAvatar);

  await newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success register",
  });
};

module.exports = register;
