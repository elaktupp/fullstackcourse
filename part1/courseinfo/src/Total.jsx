import React from "react";

const Total = ({ parts }) => {
  let numberOfExercises = 0;
  parts.map((p) => {
    numberOfExercises += p.exercises;
  });

  return (
    <div>
      <hr />
      <h4>Number of excersises {numberOfExercises}</h4>
      <hr />
    </div>
  );
};

export default Total;
