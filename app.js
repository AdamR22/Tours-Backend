const ErrorHandler = require("./utils/errorHandlerFactory");

const tourRouter = require("./routes/tourRoutes");

const userRouter = require("./routes/userRoutes");

const express = require("express");

const app = express();

app.use(express.json());

if (process.env.DEV_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use("/v1/tours", tourRouter);
app.use("/v1/users", userRouter);

app.all("*", function (_, _, next) {
  next(new ErrorHandler("Endpoint not defined", 404));
});

app.use(function (error, _, res, _) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

module.exports = app;
