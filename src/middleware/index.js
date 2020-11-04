const { loggerMiddleware } = require('./logger/logger');
const validator = require('./validator/validator');
const auth = require('./auth/auth');

module.exports = {
  loggerMiddleware,
  validator,
  auth
};
