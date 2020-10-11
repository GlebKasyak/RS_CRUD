const UserService = require('./user.service');
const { ErrorHandler } = require('../../common/errorHandler');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).send(users);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async addUser(req, res, next) {
    try {
      const user = await UserService.addUser(req.body);
      res.status(200).send(user);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.userId);
      res.status(200).send(user);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(404, err.message));
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user = await UserService.updateUser(req.body, req.params.userId);
      res.status(200).send(user);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.userId);
      res.status(204).send(null);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(404, err.message));
    }
  }
}

module.exports = UserController;
