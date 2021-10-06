const Joi = require("joi");
const { Schema, model } = require("mongoose");

const phoneRegExp = /^\d+$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is obligatory parameter"],
      minLength: 1,
    },
    phone: {
      type: String,
      required: [true, "Phone is obligatory parameter"],
      match: phoneRegExp,
    },
    email: {
      type: String,
      required: [true, "Email is obligatory parameter"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const contactJoiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().length(10).pattern(phoneRegExp).required(),
  email: Joi.string().min(1).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  contactJoiSchema,
  updateFavoriteJoiSchema,
  Contact,
};
