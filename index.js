const express = require("express");
const configureDatabase = require("./src/config/database");
const configureMiddleware = require("./src/config/middleware");
const configureRoutes = require("./src/routing/routes");
const passport = require("passport");

const app = express();

// CONFIGURATION
configureDatabase();
configureMiddleware(app, passport);
configureRoutes(app);

module.exports = app;
