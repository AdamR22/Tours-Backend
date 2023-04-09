function productionErrorHandler(error, res) {

  if (error.isOperationalError) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "Error",
      message: "Something went wrong.",
    });
  }
}

module.exports = productionErrorHandler;