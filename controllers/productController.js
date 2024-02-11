const Product = require("../models/product");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const newProduct = await Product.create({ ...req.body });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json({ product: updatedProduct });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const deletedProduct = await Product.findByIdAndRemove(productId);
      if (!deletedProduct) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).send();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProductController;
