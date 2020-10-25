const { connect, connection, connections } = require('mongoose');

const config = require('./config');
const { logger } = require('../middleware/logger/logger');

module.exports = () => {
  connect(config.MONGO_CONNECTION_STRING, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).catch(err => logger.error(err.message, { module: 'MongoDBConnection' }));

  connection.once('open', () => {
    const info = connections[0];
    logger.info(
      `Connected to:
         host: ${info.host},
         port: ${info.port},
         name: ${info.name}`,
      { module: 'MongoDBConnection' }
    );
  });
};
