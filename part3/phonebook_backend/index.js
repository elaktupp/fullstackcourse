// DATA

let contacts = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// CODE

const express = require("express");
const app = express();
app.use(express.json()); // for easier json data access

// ROOT PAGE

app.get("/", (req, resp) => {
  resp.send("<h1>Phonebook Backend</h1>");
});

// INFO PAGE

app.get("/info", (req, resp) => {
  let info = `<p>Phonebook has info for ${contacts.length} people</p>`;
  info += `<p>${new Date()}</p>`;
  resp.send(info);
});

// ALL CONTACTS

app.get("/api/persons", (req, resp) => {
  resp.json(contacts);
});

// CONTACT BY ID

app.get("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  const contact = contacts.find((c) => c.id === id);
  if (contact) {
    // id match found
    resp.json(contact);
  } else {
    // id not found
    resp.status(404).end();
  }
  resp.json(contacts);
});

// DELETE BY ID

app.delete("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  contacts = contacts.filter((c) => c.id !== id);
  resp.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Phonebook Server running on port ${PORT}`);
});
