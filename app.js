const ErrorHandler = require("./utils/error_handlers/errorHandlerFactory");
const developmentErrorHandler = require("./utils/error_handlers/developmentErrorHandler");
const dbCastErrorHandler = require("./utils/error_handlers/dbErrorHandler");
const duplicateFieldErrorHandler = require('./utils/error_handlers/duplicateFieldsErrorHandler');
const productionErrorHandler = require("./utils/error_handlers/productionErrorHandler");
const validationErrorHandler = require("./utils/error_handlers/validationErrorHandler");

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

  if (process.env.DEV_ENV === "development") {
    developmentErrorHandler(error, res);
  } else if (process.env.DEV_ENV === "production") {
    let err = { ...error };
    
    // Error has name but err does not hence use of error
    if (error.name === "CastError") {
      err = dbCastErrorHandler(err);
    }

    if (err.code === 11000) {
      err = duplicateFieldErrorHandler(err);
    }

    if (error.name === 'ValidationError') {
      err = validationErrorHandler(err);
    }

    productionErrorHandler(err, res);
  }
});

module.exports = app;
