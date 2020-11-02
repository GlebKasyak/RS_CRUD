const userRouter = require('./users/user.router');
const boardRouter = require('./boards/board.router');
const taskRouter = require('./tasks/task.router');

const UserController = require('./users/user.controller');
const { login } = require('./users/user.validation');
const { loggerMiddleware, validator, auth } = require('../middleware');

const logger = loggerMiddleware('UserController');

module.exports = app => {
  app.use('/users', auth, userRouter);
  app.use('/boards', auth, [boardRouter, taskRouter]);
  app.post('/login', logger, validator(login, 'body'), UserController.login);
};
