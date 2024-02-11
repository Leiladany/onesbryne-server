const express = require('express');
const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/productRoutes');

module.exports = (app) => {
  const router = express.Router();

  router.use('/api/users', userRoutes);
  router.use('/api/products', productRoutes);

  app.use(router);
};
