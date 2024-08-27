import React from "react";
import Part from "./Part";

const Content = ({ p1, p2, p3 }) => {
  return (
    <div>
      <Part part={p1} />
      <Part part={p2} />
      <Part part={p3} />
    </div>
  );
};

export default Content;
