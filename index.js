const express = require("express");
const configureDatabase = require("./src/configs/database");
const configureMiddleware = require("./src/configs/middleware");
const configureErrorHandler = require("./src/middlewares/errorHandler");
const configureRoutes = require("./src/routing/routes");

const app = express();

configureDatabase();
configureMiddleware(app);
configureRoutes(app);
configureErrorHandler(app);

module.exports = app;
