const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/05-onesbryne-server";

module.exports = () => {
  mongoose
    .connect(MONGO_URI)
    .then((x) => {
      const dbName = x.connections[0].name;
      console.log(`Connected to Mongo! Database name: "${dbName}"`);
    })
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
    });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};
