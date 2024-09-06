import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    return <div className="info-message">{message}</div>;
  }
};

export default Notification;
