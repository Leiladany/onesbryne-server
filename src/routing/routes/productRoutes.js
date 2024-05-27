const ProductController = require("../controllers/productController");
const express = require("express");
const router = express.Router();
const { isAdmin } = require("../../middlewares/authentication");

router.get("/", ProductController.getAllProducts);
router.post(
  "/",
  ProductController.createProduct
);
router.get("/:productId", ProductController.getProductById);
router.put(
  "/:productId",
  ProductController.updateProductById
);
router.delete("/:productId", ProductController.deleteProductById);

module.exports = router;
