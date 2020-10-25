const winston = require('winston');
const clc = require('cli-color');

const { loggerOptions, loggerTypes } = require('./logger.options');
const {
  getActualRequestDurationInMilliseconds
} = require('../../common/helpers');

class LoggerService {
  constructor() {
    this.logger = winston.createLogger({
      format: this.defaultFormatter(loggerOptions.console),
      transports: [
        new winston.transports.Console(loggerOptions.console),
        new winston.transports.File(loggerOptions.file)
      ],
      exitOnError: false
    });
  }

  info(message, meta) {
    this.logger.info(message, meta);
  }

  error(message, meta) {
    if (JSON.stringify(message).length < 100) {
      this.logger.error(JSON.stringify(message), meta);
    } else {
      this.logger.error(JSON.stringify(message, null, 2), meta);
    }
  }

  defaultFormatter(options) {
    const { colorize } = options;
    // eslint-disable-next-line no-unused-vars
    const format = winston.format.printf(
      ({ level, message, timestamp, module }) => {
        if (module === undefined && level === loggerTypes.ERROR) {
          return '';
        }
        const newLevel = colorize
          ? this.colorizeLevel(level, `[${level}]`.toUpperCase())
          : `[${level.toUpperCase()}]`;
        const newMessage = this.colorizeLevel(level, message);
        const newModule = module
          ? this.colorizeLevel(loggerTypes.WARN, `[${module}]`)
          : '';
        const requestTime = this.colorizeLevel(
          loggerTypes.WARN,
          getActualRequestDurationInMilliseconds(process.hrtime())
        );
        return `${newLevel}  - ${timestamp}  ${newModule} ${newMessage} ${requestTime}`;
      }
    );

    return winston.format.combine(
      winston.format.timestamp({
        format: options.timeFormat
      }),
      format
    );
  }

  colorizeLevel(level, text) {
    switch (level) {
      case loggerTypes.DEBUG:
        return clc.black(text);
      case loggerTypes.INFO:
        return clc.green(text);
      case loggerTypes.WARN:
        return clc.yellow(text);
      case loggerTypes.ERROR:
        return clc.red(text);
      default:
        return clc.green(text);
    }
  }
}

const logger = new LoggerService();

const loggerMiddleware = module => (req, res, next) => {
  const service = req.route.stack[req.route.stack.length - 1].name;
  let data = {
    url: req.baseUrl + req.route.path,
    method: req.method,
    params: req.params,
    query: req.query,
    body: req.body
  };
  for (const key in data) {
    if (!Object.keys(data[key]).length) {
      delete data[key];
    }
  }
  if (JSON.stringify(data).length < 100) {
    data = `${service} ${JSON.stringify(data)} route`;
  } else {
    data = `${service} ${JSON.stringify(data, null, 3)} route`;
  }
  logger.info(data, { module });
  next();
};

module.exports = { logger, loggerMiddleware };
