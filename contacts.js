const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Returns an array of contacts
function listContacts() {
  (async () => {
    try {
      const jsonReadResult = await fs.readFile(contactsPath);
      const contacts = JSON.parse(jsonReadResult);
      console.table(contacts);
    } catch (error) {
      console.log(error);
    }
  })();
}

//Returns a contact object with this id.
function getContactById(contactId) {
  (async () => {
    try {
      const jsonReadResult = await fs.readFile(contactsPath);
      const contacts = JSON.parse(jsonReadResult);

      const contactById = contacts.find(
        ({ id, name, email, phone }) => id === contactId
      );
      // return contactById || null;
      if (!contactById) {
        console.log("null");
        return;
      }
      console.log(contactById);
    } catch (error) {
      console.log(error.message);
    }
  })();
}

//Returns the remote contact object.
const removeContact = async (contactId) => {
  const jsonReadResult = await fs.readFile(contactsPath);
  const contacts = JSON.parse(jsonReadResult);
  const contactDelete = contacts.filter(({ id }) => id === contactId);
  console.log(contactDelete);
};

//Returns the added contact object.
function addContact(name, email, phone) {
  (async () => {
    try {
      const addNewContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
      };

      const jsonReadResult = await fs.readFile(contactsPath);
      const contacts = JSON.parse(jsonReadResult);
      contacts.push(addNewContact);

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, " "));
      console.log(addNewContact);

      console.log(`The contact is added in ${contactsPath}`.yellow);
    } catch (error) {
      console.log(error.red);
    }
  })();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
