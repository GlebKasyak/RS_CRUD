const UserService = require("./user.service");
const { ErrorHandler } = require("../../common/errorHandler");

class UserController {
  static getAllUsers = async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).send(users);
    } catch (err) {
      next(new ErrorHandler(400, err.message));
    }
  };

  static addUser = async (req, res, next) => {
    try {
      const user = await UserService.addUser(req.body);
      res.status(200).send(user);
    } catch (err) {
      next(new ErrorHandler(400, err.message));
    }
  };

  static getUserById = async (req, res, next) => {
    try {
      const user = await UserService.getUserById(req.params.userId);
      res.status(200).send(user);
    } catch (err) {
      next(new ErrorHandler(404, err.message));
    }
  };

  static updateUser = async (req, res, next) => {
    try {
      const user = await UserService.updateUser(req.body, req.params.userId);
      res.status(200).send(user);
    } catch (err) {
      next(new ErrorHandler(400, err.message));
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      await UserService.deleteUser(req.params.userId);
      res.status(204).send(null);
    } catch (err) {
      next(new ErrorHandler(404, err.message));
    }
  };
};

module.exports = UserController;
