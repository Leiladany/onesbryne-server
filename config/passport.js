const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// SERIALIZE USER INTO THE SESSION
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// DESERIALIZE USER FROM THE SESSION
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// LOCAL STRAT FOR USER AUTH
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
