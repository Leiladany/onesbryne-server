const ProductController = require("../controllers/productController");
const express = require("express");
const router = express.Router();
const { isAdmin } = require("../../middlewares/authentication");

const upload = require("../../configs/multer");

router.get("/", ProductController.getAllProducts);
router.post(
  "/",
  isAdmin,
  upload.single("img"),
  ProductController.createProduct
);
router.get("/:productId", ProductController.getProductById);
router.put(
  "/:productId",
  isAdmin,
  upload.single("img"),
  ProductController.updateProductById
);
router.delete("/:productId", isAdmin, ProductController.deleteProductById);

module.exports = router;
