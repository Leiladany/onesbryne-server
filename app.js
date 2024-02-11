const express = require("express");
const configureDatabase = require("./config/database");
const configureMiddleware = require("./config/middleware");
const configureErrorHandling = require("./config/errorHandling");
const configureRoutes = require("./config/routes");
const passport = require("passport");

const app = express();

// CONFIGURATION
configureDatabase();
configureMiddleware(app, passport);
configureErrorHandling(app);
configureRoutes(app);

module.exports = app;
