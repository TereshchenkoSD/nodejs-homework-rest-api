const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Already registered");
  }

  const newAvatar = gravatar.url(email, { s: "200" }, true);
  const verifyToken = nanoid();
  const newUser = new User({ email, verifyToken });
  newUser.setPassword(password);
  newUser.setAvatar(newAvatar);

  await newUser.save();

  const data = {
    to: email,
    subject: "Confirmation of signup on the web-site",
    html: `
    <a href="http://localhost:3000/api/auth/verify/${verifyToken}" target="_blank">Confirm the email</a>
    `,
  };

  await sendEmail(data);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success register",
    data: {
      verifyToken,
    },
  });
};

module.exports = register;
