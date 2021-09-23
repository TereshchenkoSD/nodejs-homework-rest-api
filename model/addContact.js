const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");
const { v4 } = require("uuid");

async function addContact(body) {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...body };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = addContact;
