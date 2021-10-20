const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`Email ${email} not found`);
  }

  if (!user.comparePassword(password)) {
    throw new BadRequest("Invalid password");
  }

  if (!user.verify) {
    throw new BadRequest("Email is not verified");
  }

  const { _id } = user;
  const token = user.createToken();
  await User.findByIdAndUpdate(_id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
