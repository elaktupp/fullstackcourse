import React from "react";

const Persons = ({ contactList }) => {
  return (
    <div>
      {contactList.map((p, i) => (
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
