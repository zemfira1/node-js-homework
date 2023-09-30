import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  try {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getContactById = async (id) => {
  try {
    const contactsList = await listContacts();
    const result = contactsList.find((item) => item.id === id);
    return result || null;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addContact = async ({ name, email, phone }) => {
  try {
    const contactsList = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const removeContact = async (id) => {
  try {
    const contactsList = await listContacts();
    const index = contactsList.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contactsList.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
