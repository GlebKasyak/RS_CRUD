const errorHandler = app => {
  app.use((err, req, res) => {
    const status = err.status || 500;
    const message = err.message || 'Server error';

    res.status(status).json({
      status: 'error',
      message
    });
  });
};

class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  errorHandler,
  ErrorHandler
};
