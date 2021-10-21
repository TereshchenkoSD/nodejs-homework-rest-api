const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY, SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: SENDER_EMAIL };
  await sgMail.send(email);
};

module.exports = sendEmail;
