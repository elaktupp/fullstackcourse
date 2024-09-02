import React from "react";

const Total = ({ parts }) => {
  let numberOfExercises = 0;
  // One way to count total
  // parts.map((p) => {
  //   numberOfExercises += p.exercises;
  // });

  // Another way to count, using reduce. Note 0 parameter, it is initial sum.
  numberOfExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <hr />
      <h4>Number of excersises {numberOfExercises}</h4>
      <hr />
    </div>
  );
};

export default Total;
