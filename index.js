const express = require("express");
const configureDatabase = require("./src/configs/database");
const configureMiddleware = require("./src/configs/middleware");
const configureRoutes = require("./src/routing/routes");
const passport = require("passport");

const app = express();

// CONFIGURATION
configureDatabase();
configureMiddleware(app, passport);
configureRoutes(app);

module.exports = app;
