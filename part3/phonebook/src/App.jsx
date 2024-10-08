import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phonebookService
      .getAllContacts()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        showMessage(`"${error.message}" occured!`, "error", 0);
      });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

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

  const showMessage = (message, type = "info", timeout = 3000) => {
    setMessage({ text: message, type: type });
    if (timeout > 0) {
      setTimeout(() => {
        setMessage(null);
      }, timeout);
    }
  };

  const handleAddContact = (event) => {
    event.preventDefault();

    //persons.find((p) => console.log(p.name === newName, p));

    let personExists = persons.find((p) => p.name === newName);
    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to overwrite existing number?`
        )
      ) {
        const newPersonData = {
          id: personExists.id,
          name: newName,
          number: newNumber,
        };
        phonebookService
          .updateContact(newPersonData)
          .then((data) => {
            phonebookService.getAllContacts().then((data) => setPersons(data));
            setNewName("");
            setNewNumber("");
            showMessage(`Number of ${data.name} changed to ${data.number}.`);
          })
          .catch((error) => {
            console.log("UPDATE ERROR:", error);
            showMessage(
              `${newPersonData.name} is already removed from server.`,
              "error",
              5000
            );
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      phonebookService
        .createContact(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
          showMessage(`New contact added ${data.name} ${data.number}.`);
        })
        .catch((error) => {
          console.log(error);
          console.log("CREATION ERROR:", error);
          showMessage(`${error.response.data.error}`, "error", 5000);
        });
    }
  };

  const handleDeleteContact = (index) => {
    if (
      window.confirm(`Are you sure you want to remove ${persons[index].name}?`)
    ) {
      phonebookService
        .deleteContact(persons[index].id)
        .then((data) => {
          showMessage(`Removed ${persons[index].name}.`);
          phonebookService.getAllContacts().then((data) => setPersons(data));
        })
        .catch((error) => {
          showMessage(
            `${newPersonData.name} is already removed from server.`,
            "error",
            5000
          );
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new contact</h2>
      <PersonForm
        handleAddContact={handleAddContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons contactList={contactList} deleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
