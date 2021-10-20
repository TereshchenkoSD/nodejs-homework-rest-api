const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { BadRequest } = require("http-errors");

const reverify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest("missing required field email");
  }
  const user = await User.findOne({ email });

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const data = {
    to: email,
    subject: "Confirmation of signup on the web-site",
    html: `
    <a href="http://localhost:3000/api/auth/verify/${verifyToken}" target="_blank">Confirm the email</a>
    `,
  };

  await sendEmail(data);
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = reverify;
