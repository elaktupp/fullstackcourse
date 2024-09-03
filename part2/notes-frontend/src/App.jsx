import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: String(notes.length + 1), <-- OMITTED, LET SERVER SET THIS!
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");

    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      console.log(response);
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h3>Notes</h3>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.content}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          placeholder="a new note..."
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
