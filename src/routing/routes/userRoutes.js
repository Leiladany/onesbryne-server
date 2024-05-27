const UserController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/", UserController.getUsers);
router.get("/:userId", UserController.getUserById);
router.put("/:userId", UserController.updateUserById);
router.get("/:userId/favourites", UserController.getUserFavourites);
router.put("/:userId/favourites", UserController.updateUserFavourite);

module.exports = router;
