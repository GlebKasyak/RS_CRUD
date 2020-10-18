const { OK, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

const UserService = require('./user.service');
const { ErrorHandler } = require('../../common/error/errorHandler');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(OK).send(users);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async addUser(req, res, next) {
    try {
      const user = await UserService.addUser(req.body);
      res.status(OK).send(user);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.userId);
      res.status(OK).send(user);
    } catch (err) {
      return next(new ErrorHandler(NOT_FOUND, err.message));
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user = await UserService.updateUser(req.body, req.params.userId);
      res.status(OK).send(user);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.userId);
      res.status(NO_CONTENT).send(null);
    } catch (err) {
      return next(new ErrorHandler(NOT_FOUND, err.message));
    }
  }
}

module.exports = UserController;
