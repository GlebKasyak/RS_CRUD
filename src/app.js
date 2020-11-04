const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const connectToDB = require('./common/db');
const rootRouter = require('./resources/rootRouter');
const { errorHandler } = require('./common/error/errorHandler');
const processError = require('./common/error/processError');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

rootRouter(app);
errorHandler(app);
processError();
connectToDB();

module.exports = app;
