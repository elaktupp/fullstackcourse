const { app, port } = require("./app"); // the Express app

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
