const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, email, fullName } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        fullName,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  loginUser: async (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      // Generate JWT token and send it in the response
      const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    })(req, res, next);
  },

  getUserProfile: async (req, res) => {
    try {
      // Implement logic to retrieve user profile using the User model
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      // Implement logic to update user profile using the User model
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Add more controller functions as needed
};

module.exports = UserController;
