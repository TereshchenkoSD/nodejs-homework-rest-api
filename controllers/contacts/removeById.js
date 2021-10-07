const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new NotFound(`Contact with the id-${contactId} was not found`);
  }
  sendSuccessRes(res, { contact, message: "Success delete" });
};

module.exports = removeById;
