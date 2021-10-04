//Comment

const { NotFound } = require("http-errors");
const { contactJoiSchema } = require("../models/contact");
const { sendSuccessRes } = require("../helpers");
const { Contact } = require("../models");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "_id name phone email favorite");
  sendSuccessRes(res, { result });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(
    contactId,
    "_id name phone email favorite"
  );
  if (!result) {
    throw new NotFound(`Contact with the id-${contactId} was not found`);
  }
  sendSuccessRes(res, { result });
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  sendSuccessRes(res, { result }, 201);
};

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

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact with the id-${contactId} was not found`);
  }
  sendSuccessRes(res, { message: "Success delete" });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound(`Contact with the id-${contactId} was not found`);
  }
  sendSuccessRes(res, { result });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
  updateFavorite,
};
