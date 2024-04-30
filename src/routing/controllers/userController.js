const User = require("../../models/user");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserById: async (req, res) => {
    const { userId } = req.params;

    try {
      const oneUser = await User.findById(userId);

      const userCopy = oneUser._doc;

      delete userCopy.passwordHash;

      res.status(200).json({ user: userCopy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUserById: async (req, res) => {
    const { userId } = req.params;

    try {
      const updatedData = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      res.status(200).json({ data: updatedData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUserById: async (req, res) => {
    const { userId } = req.params;

    try {
      await User.findByIdAndDelete(userId);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
