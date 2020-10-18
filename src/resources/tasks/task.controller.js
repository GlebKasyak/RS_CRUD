const { OK, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

const TaskService = require('./task.service');
const { ErrorHandler } = require('../../common/error/errorHandler');

class TaskController {
  static async getAllTasks(req, res, next) {
    try {
      const tasks = await TaskService.getAllTasks(req.params.boardId);
      res.status(OK).send(tasks);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async addTask(req, res, next) {
    try {
      const task = await TaskService.addTask(req.body, req.params.boardId);
      res.status(OK).send(task);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async getTaskByIds(req, res, next) {
    try {
      const board = await TaskService.getTaskByIds(req.params);
      res.status(OK).send(board);
    } catch (err) {
      return next(new ErrorHandler(NOT_FOUND, err.message));
    }
  }

  static async updateTaskByIds(req, res, next) {
    try {
      const board = await TaskService.updateTaskByIds(req.body, req.params);
      res.status(OK).send(board);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async deleteTaskByIds(req, res, next) {
    try {
      await TaskService.deleteTaskByIds(req.params);
      res.status(NO_CONTENT).send(null);
    } catch (err) {
      return next(new ErrorHandler(NOT_FOUND, err.message));
    }
  }
}

module.exports = TaskController;
