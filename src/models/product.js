const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  size: {
    type: String,
    required: true,
    enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  status: {
    type: String,
    default: "Disponível",
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
