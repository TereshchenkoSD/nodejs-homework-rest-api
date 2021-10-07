const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { favorite } = req.query;
  const result = await Contact.find(
    favorite ? { owner: _id, favorite } : { owner: _id }
  );
  sendSuccessRes(res, { result });
};

module.exports = getAll;

// "_id name phone email favorite"
