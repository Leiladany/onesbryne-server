const express = require("express");
const passport = require("passport");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get(
  "/:userId",
  UserController.getUserById,
  passport.authenticate("jwt", { session: false })
);
router.put(
  "/:userId",
  UserController.updateUserById,
  passport.authenticate("jwt", { session: false })
);
router.delete(
  "/:userId",
  UserController.deleteUserById,
  passport.authenticate("jwt", { session: false })
);

module.exports = router;
