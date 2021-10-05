const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw new NotFound(`Email ${email} not found`);
  }

  if (!user.comparePassword(password)) {
    throw new BadRequest("Invalid password");
  }
  res.status().json({});
};

module.exports = login;
