const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: {
    type: String,
    required: true,
    enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
  },
  price: { type: Number, required: true },
  description: { type: String },
  type: { type: String, required: true, enum: ["available", "sold"] },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
