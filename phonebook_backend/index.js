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

// MIDDLEWARE

const errorHandler = (error, req, resp, next) => {
  console.log(error);
  if (error.name === "CastError") {
    resp.status(400).send({ error: "malformed id:" });
  }
  next(error);
};

// CODE

// Environment variables
require("dotenv").config(); // do this before database models

// Http request logger
const morgan = require("morgan");

// Custom token for contact logging
morgan.token("contact", (req, resp) => {
  let payload = "(no payload)";
  if (Object.keys(req.body).length > 0) {
    payload = JSON.stringify(req.body);
  }
  return payload;
});

const express = require("express");
const app = express();
app.use(express.json()); // for easier json data access

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :contact"
  )
);

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

// DATABASE, MODEL
const Contact = require("./models/contact");

// ROOT PAGE

app.get("/", (req, resp) => {
  resp.send("<h1>Phonebook Backend</h1>");
});

// INFO PAGE

app.get("/info", (req, resp) => {
  Contact.find({})
    .then((contacts) => {
      let info = `<p>Phonebook has info for ${contacts.length} people</p>`;
      info += `<p>${new Date()}</p>`;
      resp.send(info);
    })
    .catch((error) => {
      let info = `<p>Failed to get Phonebook info.</p>`;
      resp.send(info);
    });
});

// ALL CONTACTS

app.get("/api/persons", (req, resp) => {
  Contact.find({}).then((contacts) => {
    resp.json(contacts);
  });
});

// CONTACT BY ID

app.get("/api/persons/:id", (req, resp, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      resp.json(contact);
    })
    .catch((error) => next(error));
});

// DELETE BY ID

app.delete("/api/persons/:id", (req, resp, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((result) => {
      resp.status(204).end(); // 204 no content
    })
    .catch((error) => next(error));
});

// UPDATE BY ID

app.put("/api/persons/:id", (req, resp, next) => {
  const body = request.body;

  const contact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then((updatedContact) => {
      resp.json(updatedContact);
    })
    .catch((error) => next(error));
});

// CREATE NEW CONTACT

app.post("/api/persons", (req, resp) => {
  const body = req.body;

  let errors = checkNewContactForErrors(body.name, body.number);

  if (errors.length > 0) {
    return resp.status(400).json({ error: `${errors.join(",")}` });
  }

  Contact.find({})
    .select({ name: body.name })
    .then((contacts) => {
      console.log("FOUND SOMETHING:", contacts);
    });

  const newContact = new Contact({
    name: body.name,
    number: body.number,
  });

  newContact.save().then((savedContact) => {
    resp.json(savedContact);
  });
});

// Error handler has to be last loaded middleware and also after routes!
app.use(errorHandler);

const checkNewContactForErrors = (name, number) => {
  let errors = [];

  if (!name) {
    errors.push("name is missing");
  }

  if (!number) {
    errors.push("number is missing");
  }

  return errors;
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Phonebook Server running on port ${PORT}`);
});
