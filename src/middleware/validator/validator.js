const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('http-status-codes');

const { logger } = require('../logger/logger');

const errorResponse = errors => ({
  errors: errors.map(({ path, message }) => ({ path, message }))
});

const validator = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) {
    const status = property === 'body' ? UNPROCESSABLE_ENTITY : BAD_REQUEST;
    logger.error(
      {
        message: errorResponse(error.details),
        status
      },
      { module: 'Validator' }
    );
    res.status(status).json({
      status: 'error',
      message: errorResponse(error.details)
    });
  } else {
    return next();
  }
};

module.exports = validator;
