const { NotFound } = require("http-errors");
const { contactSchema } = require("../schemas");
const { sendSuccessRes } = require("../helpers");
const contactsOperations = require("../model");

const getAll = async (req, res) => {
  const result = await contactsOperations.listContacts();
  sendSuccessRes(res, { result });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    throw new NotFound(`Contact with the id-${contactId} was not found`);
  }
  sendSuccessRes(res, { result });
};

const add = async (req, res) => {
  const result = await contactsOperations.addContact(req.body);
  sendSuccessRes(res, { result }, 201);
};

const updateById = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { contactId } = req.params;
  const result = await contactsOperations.updateContactById(
    contactId,
    req.body
  );
  if (!result) {
    throw new NotFound(`Contact with the id-${contactId} was not found`);
  }
  sendSuccessRes(res, { result });
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with the id-${contactId} was not found`);
  }
  sendSuccessRes(res, { message: "Success delete" });
};

module.exports = { getAll, getById, add, updateById, removeById };
