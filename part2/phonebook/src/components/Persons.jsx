import React from "react";

const Persons = ({ contactList, deleteContact }) => {
  return (
    <div>
      {contactList.map((p, i) => (
        <div key={p.name}>
          {p.name} {p.number}{" "}
          <button onClick={() => deleteContact(i)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
