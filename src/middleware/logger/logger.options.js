const { join } = require('path');

const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_LEVEL = 'info';

const loggerOptions = {
  console: {
    level: DEFAULT_LEVEL,
    handleExceptions: true,
    json: false,
    colorize: true,
    timeFormat: DEFAULT_TIME_FORMAT
  },
  file: {
    level: DEFAULT_LEVEL,
    filename: join(__dirname, '/app.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 1,
    timeFormat: DEFAULT_TIME_FORMAT
  }
};

const loggerTypes = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

module.exports = { loggerOptions, loggerTypes };
