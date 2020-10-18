const { Router } = require('express');

const TaskController = require('./task.controller');
const { loggerMiddleware } = require('../../middleware/logger/logger');

const router = Router();
const logger = loggerMiddleware('TaskController');

router.get('/:boardId/tasks', logger, TaskController.getAllTasks);
router.post('/:boardId/tasks', logger, TaskController.addTask);
router.get('/:boardId/tasks/:id', logger, TaskController.getTaskByIds);
router.put('/:boardId/tasks/:id', logger, TaskController.updateTaskByIds);
router.delete('/:boardId/tasks/:id', logger, TaskController.deleteTaskByIds);

module.exports = router;
