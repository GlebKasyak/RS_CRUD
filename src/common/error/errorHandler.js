const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const { logger } = require('../../middleware/logger/logger');

const errorHandler = app => {
  app.use((err, req, res, next) => {
    const status = err.status || INTERNAL_SERVER_ERROR;
    const message = err.message || 'Server error';
    logger.error({ message, statusCode: status }, { module: 'ErrorHandler' });
    res.status(status).json({
      status: 'error',
      message
    });
    next();
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
