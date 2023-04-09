const ErrorHandler = require('./errorHandlerFactory');

const dbCastErrorHandler = function (error) {
  const message = `Invalid ${error.path}: ${error.value}`;

  return new ErrorHandler(message, 400);
};


module.exports = dbCastErrorHandler;