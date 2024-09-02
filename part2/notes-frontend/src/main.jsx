import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const userNotes = [
  { id: 1, note: "HTML is easy" },
  { id: 2, note: "Browser can execute only JavaScript" },
  {
    id: 3,
    note: "GET and POST are the most important methods of HTTP protocol",
  },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App notes={userNotes} />
  </StrictMode>
);
