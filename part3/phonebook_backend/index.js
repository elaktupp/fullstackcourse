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

// CREATE NEW CONTACT

app.post("/api/persons", (req, resp) => {
  const body = req.body;

  let errors = checkNewContactForErrors(body.name, body.number);

  if (errors.length > 0) {
    return resp.status(400).json({ error: `${errors.join(",")}` });
  }

  const newContact = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  contacts = contacts.concat(newContact);

  resp.json(newContact);
});

const generateId = () => {
  // Random integer from min (included) to max (excluded)
  const min = 1;
  const max = Number.MAX_SAFE_INTEGER;
  return Math.floor(Math.random() * (max - min) + min);
};

const checkNewContactForErrors = (name, number) => {
  let errors = [];

  if (!name) {
    errors.push("name is missing");
  }

  if (!number) {
    errors.push("number is missing");
  }

  if (contacts.find((c) => c.name === name)) {
    errors.push("name already exists");
  }

  return errors;
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Phonebook Server running on port ${PORT}`);
});
