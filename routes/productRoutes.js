const express = require("express");
const passport = require("passport");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.post(
  "/",
  ProductController.createProduct,
  passport.authenticate("jwt", { session: false })
);
router.get(
  "/:productId",
  ProductController.getProductById,
  passport.authenticate("jwt", { session: false })
);
router.put(
  "/:productId",
  ProductController.updateProductById,
  passport.authenticate("jwt", { session: false })
);
router.delete(
  "/:productId",
  ProductController.deleteProductById,
  passport.authenticate("jwt", { session: false })
);

module.exports = router;
