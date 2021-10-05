const Joi = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
};
