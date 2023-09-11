class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

exports.errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  console.log("error is:", err);
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

exports.ErrorHandler = ErrorHandler;
