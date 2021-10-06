const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "_id name phone email favorite");
  sendSuccessRes(res, { result });
};

module.exports = getAll;
