const UserController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getUserById);
router.put("/:userId", UserController.updateUserById);
router.delete("/:userId", UserController.deleteUserById);


module.exports = router;