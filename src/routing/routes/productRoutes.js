const ProductController = require("../controllers/productController");
const express = require("express");
const router = express.Router();
/* const { isAdmin } = require("../../middlewares/authentication"); */

router.get("/", ProductController.getAllProducts);
router.get("/status/available", ProductController.getAllAvailableProducts);
router.get("/status/archived", ProductController.getAllArchivedProducts);
router.get("/status/sold", ProductController.getAllSoldProducts);
router.post("/", /* isAdmin, */ ProductController.createProduct);
router.get("/:productId", ProductController.getProductById);
router.put("/:productId", /* isAdmin, */ ProductController.updateProductById);
router.delete("/:productId", /* isAdmin, */ ProductController.deleteProductById);

module.exports = router;
