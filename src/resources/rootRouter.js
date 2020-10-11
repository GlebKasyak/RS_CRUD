const userRouter = require('./users/user.router');
const boardRouter = require('./boards/board.router');
const taskRouter = require('./tasks/task.router');

module.exports = app => {
  app.use('/users', userRouter);
  app.use('/boards', [boardRouter, taskRouter]);
};
