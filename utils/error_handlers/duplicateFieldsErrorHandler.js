const ErrorHandler = require("./errorHandlerFactory");

module.exports = function duplicateFieldErrorHandler(error) {
  const value = error.keyValue.name;
  const message = `Duplicate field value, ${value}: Please use another value`;

  return new ErrorHandler(message, 400);
};
