const app = require("./app"); // the Express app
const config = require("./config");
const logger = require("./logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
