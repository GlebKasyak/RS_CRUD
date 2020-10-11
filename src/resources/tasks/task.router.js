const { Router } = require('express');

const TaskController = require('./task.controller');

const router = Router();

router.get('/:boardId/tasks', TaskController.getAllTasks);
router.post('/:boardId/tasks', TaskController.addTask);
router.get('/:boardId/tasks/:id', TaskController.getTaskByIds);
router.put('/:boardId/tasks/:id', TaskController.updateTaskByIds);
router.delete('/:boardId/tasks/:id', TaskController.deleteTaskByIds);

module.exports = router;
