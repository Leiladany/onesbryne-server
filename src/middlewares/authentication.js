const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json("Token not provided or not valid");
  }
};

const isAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;

    console.log(payload);

    if (payload.userRole !== "admin") {
      return res.status(403).json("Unauthorized access");
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(403).json("Unauthorized access");
  }
};

module.exports = { isAuthenticated, isAdmin };
