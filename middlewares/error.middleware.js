function errorHandler(err, req, res, next) {
  res.status(500).json({
    acknowledgement: false,
    title: "Internal Server Error",
    message: err.name,
    description: err.message,
  });
}

module.exports = errorHandler;
