const Product = require("../../models/product");
const { deleteFile } = require("../../utils/fileManager");

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
      const productData = {
        ...req.body,
        img: req.file ? req.file.path : null,
      };
      const newProduct = await Product.create(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
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

  updateProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (req.file && product.img) {
        await deleteFile(product.img);
      }

      const productData = {
        ...req.body,
        img: req.file ? req.file.path : product.img,
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true }
      );
      res.status(200).json({ product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await deleteFile(product.img);

      await Product.findByIdAndDelete(productId);
      res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProductController;
