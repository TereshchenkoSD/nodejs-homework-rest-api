const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }
  const updateContact = { ...contacts[contactIndex], ...data };
  contacts[contactIndex] = updateContact;
  await updateContacts(contacts);
  return updateContact;
};

module.exports = updateContactById;
