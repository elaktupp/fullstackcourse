//
// MIDDLEWARE
//
const requestLogger = (req, resp, next) => {
  console.log("Method:", req.method);
  console.log("Path  :", req.path);
  console.log("Body  :", req.body);
  console.log("- - - - - - - - - -");
  next();
};

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, resp, next) => {
  console.log(error);
  if (error.name === "CastError") {
    resp.status(400).send({ error: "malformed id:" });
  }
  next(error);
};

//
// HELPER FUNCTIONS
//
const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;

  // ...notes.map((n) => Number(n.id)) produces array of ids, e.g. [1,2,3]
  // But array cannot be use as a parameter to Math.max.
  // Array is transformed into individual number by using "..." spread syntax.

  return String(maxId + 1);
};

//
// CODE
//
require("dotenv").config(); // do this before database models

const express = require("express");
const app = express();

// Express json for easier data access, (among) very first to be loaded.
app.use(express.json());
// Note that logger must be after json parser,
// otherwise body would be empty. Order of
// appearance in code is also execution order
// of middleware.
app.use(requestLogger);

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

//
// DATABASE, MODELS
//
const Note = require("./models/note");

//
// DATA
//
let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  {
    id: "3",
    content: "GET and POST and the most important mehtods of HTTP protocol",
    important: true,
  },
];

//
// ROOT
//
app.get("/", (request, response) => {
  response.send("<h1>Hello There!</h1>");
});

//
// API / GET ALL NOTES
//
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

//
// API / GET NOTE BY ID
//
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error)); // moving error handling into middleware
});

//
// API / DELETE
//
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);
  // 204 = no content
  response.status(204).end();
});

//
// API / NEW NOTE
//
app.post("/api/notes", (request, response) => {
  // NOTE: Without the json-parser request.body would be undefined.
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// Non-existing route, set AFTER ROUTES!
app.use(unknownEndpoint);

// Error handler has to be last loaded middleware and also after routes!
app.use(errorHandler);

// *** NOTE ***
// The execution order of middleware is the same as the order that they are loaded
// into Express with the app.use function.
// For this reason, it is important to be careful when defining middleware.
//

//
// START LISTENING
//
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
