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

app.get("/", (req, resp) => {
  resp.send("<h1>Phonebook Backend</h1>");
});

app.get("/info", (req, resp) => {
  let info = `<p>Phonebook has info for ${contacts.length} people</p>`;
  info += `<p>${new Date()}</p>`;
  resp.send(info);
});

app.get("/api/persons", (req, resp) => {
  resp.json(contacts);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Phonebook Server running on port ${PORT}`);
});
