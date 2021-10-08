const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models");

const getCurrentUser = async (req, res) => {
  const { _id, email, subscription } = req.user;
  const result = await Contact.find({ owner: _id });
  sendSuccessRes(res, { user: _id, email, subscription }, result, 200);
};

module.exports = getCurrentUser;
