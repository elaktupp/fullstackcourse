import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        // NOTE: Could use (part, index) here as a key
        //       but it is not recommended. Prefer unique
        //       id that comes with the data, whenever
        //       possible.
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

export default Content;
