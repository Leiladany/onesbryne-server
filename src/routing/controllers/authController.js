const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController = {
  signupUser: async (req, res) => {
    const salt = bcrypt.genSaltSync(13);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    try {
      const newUser = await User.create({ ...req.body, passwordHash });
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const potentialUser = await User.findOne({ email });
    if (potentialUser) {
      if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
        const authToken = jwt.sign(
          { userId: potentialUser._id, userRole: potentialUser.role },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "4h",
          }
        );

        res.status(200).json({ token: authToken });
      } else {
        res.status(400).json({ message: "Incorrect password." });
      }
    } else {
      res.status(400).json({ message: "Incorrect email" });
    }
  },
};

module.exports = AuthController;
