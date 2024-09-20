const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("./config");
const middleware = require("./middleware");
const blogsRouter = require("./blogs");

logger.info("connecting to", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
