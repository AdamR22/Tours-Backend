const ErrorHandler = require("./errorHandlerFactory");

module.exports = function validationErrorHandler(error) {
  const errors = Object.values(error.errors).map((err) => err.message);

  const message = `Invalid input data: ${errors.join(' ')}`;
  return new ErrorHandler(message, 400);
};
