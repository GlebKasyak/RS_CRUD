const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const { logger } = require('../../middleware/logger/logger');

module.exports = () => {
  process.on('unhandledRejection', err => {
    logger.error(
      { message: err.message, status: INTERNAL_SERVER_ERROR },
      { module: 'UnhandledRejection' }
    );
  });

  process.on('uncaughtException', err => {
    logger.error(
      { message: err.message, status: INTERNAL_SERVER_ERROR },
      { module: 'UncaughtException' }
    );
  });
};
