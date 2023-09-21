import * as contactsService from "./db/contacts.js";
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactsService.listContacts();
      return console.log(contactsList);

    case "get":
      const contactById = await contactsService.getContactById(id);
      return console.log(contactById);

    case "add":
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);

    case "remove":
      const contactForDel = await contactsService.removeContact(id);
      return console.log(contactForDel);

    default:
      console.log("unknown");
  }
};

invokeAction(options);
