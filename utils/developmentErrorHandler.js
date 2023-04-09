module.exports = function developmentErrorHandler(error, res) {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error,
  });
};
