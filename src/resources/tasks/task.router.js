const { Router } = require('express');

const TaskController = require('./task.controller');
const { newTask, boardId, ids, updateTask } = require('./task.validation');
const { loggerMiddleware, validator } = require('../../middleware');

const router = Router();
const logger = loggerMiddleware('TaskController');

router.get(
  '/:boardId/tasks',
  logger,
  validator(boardId, 'params'),
  TaskController.getAllTasks
);
router.post(
  '/:boardId/tasks',
  logger,
  validator(boardId, 'params'),
  validator(newTask, 'body'),
  TaskController.addTask
);
router.get(
  '/:boardId/tasks/:id',
  logger,
  validator(ids, 'params'),
  TaskController.getTaskByIds
);
router.put(
  '/:boardId/tasks/:id',
  logger,
  validator(ids, 'params'),
  validator(updateTask, 'body'),
  TaskController.updateTaskByIds
);
router.delete(
  '/:boardId/tasks/:id',
  logger,
  validator(ids, 'params'),
  TaskController.deleteTaskByIds
);

module.exports = router;
