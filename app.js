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

  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error,
    });
  } else if (process.env.NODE_ENV === "production") {
    if (error.isOperationalError) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 'Error',
        message: 'Something went wrong.'
      });
    }
  }
});

module.exports = app;
