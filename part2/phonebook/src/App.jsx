import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

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
      {persons.map((p, i) => (
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  );
};

export default App;
