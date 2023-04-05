class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status =
      statusCode.toString() === "404"
        ? "Not found"
        : statusCode.toString().startsWith("4")
        ? "Fail"
        : "Error";
    this.isOperationalError = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
