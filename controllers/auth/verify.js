const { User } = require("../../models");

const { NotFound } = require("http-errors");
const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });

  if (!user) {
    throw new NotFound("Verification error");
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  res.json({
    status: "success",
    code: 200,
    message: "Email verification success",
  });
};

module.exports = verify;
