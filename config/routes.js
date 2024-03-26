const express = require("express");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const productRoutes = require("../routes/productRoutes");
const { isAuthenticated } = require("../middleware/authentication");

module.exports = (app) => {
  const router = express.Router();

  // Routes not requiring authentication
  router.use("/auth", authRoutes);

  // Routes requiring authentication
  router.use("/api/users" /* , isAuthenticated */, userRoutes);
  router.use("/api/products" /* , isAuthenticated */, productRoutes);

  app.use(router);
};

// passport.authenticate("jwt", { session: false }),
