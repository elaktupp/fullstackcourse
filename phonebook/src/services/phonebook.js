import axios from "axios";
import { act } from "react";
const baseUrl = "http://localhost:3001/persons";

const getAllContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createContact = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateContact = (newContactData) => {
  const request = axios.put(`${baseUrl}/${newContactData.id}`, newContactData);
  return request.then((response) => response.data);
};

export default { getAllContacts, createContact, deleteContact, updateContact };
