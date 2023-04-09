const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

process.on("uncaughtException", function () {
  console.log("Uncaught Exception, shutting down...");
  process.exit(1);
});

const app = require("./app");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.LOCAL_DB).then(function (_) {
  console.log("Connection to DB successful");
});

const port = process.env.PORT || 5000;

const server = app.listen(port, function () {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", function (_) {
  console.log("Unhandled Exception, shutting down...");

  server.close(function () {
    process.exit(1);
  });
});
