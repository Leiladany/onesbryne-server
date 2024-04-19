// routes/productRoutes.js
const express = require("express");
const upload = require("../config/multer");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.post("/", upload.single("img"), ProductController.createProduct);
router.get("/:productId", ProductController.getProductById);
router.put(
  "/:productId",
  upload.single("img"),
  ProductController.updateProductById
);
router.delete("/:productId", ProductController.deleteProductById);

module.exports = router;
