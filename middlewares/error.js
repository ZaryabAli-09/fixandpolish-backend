const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log the error details for debugging

  // Default error response
  const statusCode = err.statusCode || 500; // Use the status code from the error or default to 500
  const message = err.message || "An unexpected error occurred";

  // Send the error response to the client
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export { errorMiddleware };
