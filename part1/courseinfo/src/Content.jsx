import React from "react";
import Part from "./Part";

const Content = ({ p1, e1, p2, e2, p3, e3 }) => {
  return (
    <div>
      <Part part={p1} exercises={e1} />
      <Part part={p2} exercises={e2} />
      <Part part={p3} exercises={e3} />
    </div>
  );
};

export default Content;
