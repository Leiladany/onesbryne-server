const Product = require('../models/product');

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const newProduct = await Product.create({ name, description, price });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const { name, description, price } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price }, { new: true });
      if (!updatedProduct) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(200).json(updatedProduct);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const deletedProduct = await Product.findByIdAndRemove(productId);
      if (!deletedProduct) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(204).end(); // No content on successful deletion
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Add more controller functions as needed
};

module.exports = ProductController;
