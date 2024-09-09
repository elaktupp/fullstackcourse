const express = require("express");
const app = express();
app.use(express.json()); // for easier json data access

app.get("/", (req, resp) => {
  resp.send("<h1>Phonebook Backend</h1>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Phonebook Server running on port ${PORT}`);
});
