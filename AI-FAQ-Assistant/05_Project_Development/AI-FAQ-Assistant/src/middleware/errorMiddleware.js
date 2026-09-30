const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Respect status code set on the error object (e.g., 429 from Gemini SDK or 400/403/404)
  if (err.status) {
    statusCode = err.status;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${field}. Please use another value.`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with id of ${err.value}`;
  }

  // Only log stack trace to the console for unexpected 500 Server Errors
  if (statusCode === 500) {
    console.error(err.stack);
  } else {
    console.error(message);
  }

  res.status(statusCode).json({
    success: false,
    message: message || 'Server Error',
  });
};

module.exports = { notFound, errorHandler };
