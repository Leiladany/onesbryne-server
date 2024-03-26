const express = require("express");;
const ProductController = require("../controllers/productController");

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.post(
  "/",
  ProductController.createProduct,
);
router.get(
  "/:productId",
  ProductController.getProductById,
);
router.put(
  "/:productId",
  ProductController.updateProductById,
);
router.delete(
  "/:productId",
  ProductController.deleteProductById,
);

module.exports = router;
