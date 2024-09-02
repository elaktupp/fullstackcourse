import React from "react";

const Total = ({ parts }) => {
  let numberOfExercises = 0;
  parts.map((p) => {
    numberOfExercises += p.exercises;
  });
  // NOTE: Alternative way, using reduce
  // let total = parts.reduce((sum, part) => sum + part.exercises, 0);
  //   initial or return value  ^                                  ^
  //                 of callback^                     initial value^

  return (
    <div>
      <hr />
      <h4>Number of excersises {numberOfExercises}}</h4>
      <hr />
    </div>
  );
};

export default Total;
