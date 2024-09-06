import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    if (message.type === "error") {
      return <div className="error-message">{message.text}</div>;
    } else {
      return <div className="info-message">{message.text}</div>;
    }
  }
};

export default Notification;
