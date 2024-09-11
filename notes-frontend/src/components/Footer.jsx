import React from "react";

// Footer component with Inline CSS
const Footer = () => {
  const footerStyle = {
    display: "flex",
    color: "white",
    backgroundColor: "blue",
    fontStyle: "italic",
    fontSize: 16,
    marginTop: "0.5rem",
    padding: "1.0rem",
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  );
};

export default Footer;
