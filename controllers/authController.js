const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

  loginUser: async (req, res, next) => {
    passport.authenticate(
      "local",
      { session: false },
      async (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(401).json({ message: info.message });
        }

        try {
          const authToken = jwt.sign(
            { userId: user._id },
            process.env.TOKEN_SECRET,
            {
              algorithm: "HS256",
              expiresIn: "4h",
            }
          );

          res.status(200).json({ token: authToken });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    )(req, res, next);
  },
};

module.exports = AuthController;
