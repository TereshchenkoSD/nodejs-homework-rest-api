const { NotFound, BadRequest } = require("http-errors");
const { contactJoiSchema } = require("../../models/contact");
const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { error } = contactJoiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with the id-${contactId} was not found`);
  }
  sendSuccessRes(res, { result });
};

module.exports = updateById;
