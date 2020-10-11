const TaskService = require('./task.service');
const { ErrorHandler } = require('../../common/errorHandler');

class TaskController {
  static async getAllTasks(req, res, next) {
    try {
      const tasks = await TaskService.getAllTasks(req.params.boardId);
      res.status(200).send(tasks);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async addTask(req, res, next) {
    try {
      const task = await TaskService.addTask(req.body, req.params.boardId);
      res.status(200).send(task);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async getTaskByIds(req, res, next) {
    try {
      const board = await TaskService.getTaskByIds(req.params);
      res.status(200).send(board);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(404, err.message));
    }
  }

  static async updateTaskByIds(req, res, next) {
    try {
      const board = await TaskService.updateTaskByIds(req.body, req.params);
      res.status(200).send(board);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async deleteTaskByIds(req, res, next) {
    try {
      await TaskService.deleteTaskByIds(req.params);
      res.status(204).send(null);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(404, err.message));
    }
  }
}

module.exports = TaskController;
