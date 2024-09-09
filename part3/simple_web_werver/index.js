const express = require("express");
const app = express();

// Express json for easier data access.
app.use(express.json());

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
  response.json(notes);
});

//
// API / GET NOTE BY ID
//
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);
  // Did we found matching note?
  if (note) {
    response.json(note);
  } else {
    // NOTE: Can set custom message text, but usually
    // not done, it is UI's job to decide how to
    // present 404 to the user.
    // response.statusMessage = "No matching note found.";
    // 404 = not found
    response.status(404).end();
  }
  // NOTE: Without setting 404 reponse here the response
  // would be 200 (OK) because the request itself is successful
  // even if we do not find any note. However, that is not
  // what requester (most likely) expects or at least it is
  // more convenient to get immediately 404, so there is no
  // need to analyze the response futher to know it there
  // is a note or not.
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
  // NOTE: Without the json-parser request.body
  // would be undefined.
  const note = request.body;
  // TODO: Now just prints and returns the data.
  console.log(note);
  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
