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
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([productData]);
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
    try {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      if (error) throw error;
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (req.file && product.img) {
        fs.unlinkSync(product.img);
      }

      const { data, updateError } = await supabase
        .from("products")
        .update(updatedProductData)
        .eq("id", productId);

      if (updateError) throw updateError;

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProductById: async (req, res) => {
    const { productId } = req.params;
    try {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      if (error) throw error;
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.img && fs.existsSync(product.img)) {
        fs.unlinkSync(product.img);
      }

      const { deleteError } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
      if (deleteError) throw deleteError;

      res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProductController;
