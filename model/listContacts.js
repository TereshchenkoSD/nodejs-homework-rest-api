const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const contacts = require(contactsPath);

async function listContacts() {
  return contacts;
}

module.exports = listContacts;
