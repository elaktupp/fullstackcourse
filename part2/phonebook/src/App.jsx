import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const contactList = persons.filter((p) => {
    // Case insensitive
    if (newFilter.length > 0) {
      const lowercaseName = p.name.toLowerCase();
      const lowercaseFilter = newFilter.toLowerCase();
      // Using less strict filter, searches filter text
      // from the whole name, not just start.
      return lowercaseName.includes(lowercaseFilter);
    } else {
      return true;
    }
  });

  const handleAddContact = (event) => {
    event.preventDefault();

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is alreayd added to phonebook.`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      console.log(newPerson);
      setPersons(persons.concat(newPerson));
      console.log(persons.prev);
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with:{" "}
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={handleAddContact}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contactList.map((p, i) => (
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  );
};

export default App;
