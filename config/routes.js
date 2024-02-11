const express = require("express");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const productRoutes = require("../routes/productRoutes");

module.exports = (app) => {
  const router = express.Router();

  router.use("/auth", authRoutes);
  router.use("/api/users", userRoutes);
  router.use("/api/products", productRoutes);

  app.use(router);
};
