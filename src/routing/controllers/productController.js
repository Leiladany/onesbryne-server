const fs = require("fs");
const supabase = require("../../configs/supabase");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createProduct: async (req, res) => {
    const { name, img, size, price, description, type, status } = req.body;
    const productData = { name, img, size, price, description, type, status };
    try {
      const { data, error } = await supabase
        .from("products")
        .insert(productData)
        .select();

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProductById: async (req, res) => {
    const { productId } = req.params;
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;

      if (!data) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProductById: async (req, res) => {
    const { productId } = req.params;
    const { name, img, size, price, description, type, status } = req.body;
    const productData = { name, img, size, price, description, type, status };
    try {
      const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", productId)
        .select();

      if (error) throw error;

      if (!data) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProductById: async (req, res) => {
    const { productId } = req.params;
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProductController;
