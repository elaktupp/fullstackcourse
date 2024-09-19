const app = require("./app"); // the Express app
const config = require("./config");

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
