const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const express = require("express");
require("./passport");

const { logRequests } = require("./logger");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  // PASSPORT SETUP
  app.use(passport.initialize());

  // AUTH MIDDLEWARE SETUP
  app.use(logRequests);

  // STATIC FILES MIDDLEWARE
  app.use("/uploads", express.static("uploads"));
};
