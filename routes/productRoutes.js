const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.post("/create", ProductController.createProduct);
router.get("/:productId", ProductController.getProduct);
router.put("/:productId", ProductController.updateProduct);
router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
