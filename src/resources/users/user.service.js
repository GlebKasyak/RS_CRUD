const DB = require("../../common/database");

const ModelName = "User";

class UserService {
  static getAllUsers = async () => await DB.find(ModelName, null,["-password"]);

  static addUser = async data => await DB.create(ModelName, data, null, ["-password"]);

  static getUserById = async userId => await DB.findById(ModelName, userId, ["-password"]);

  static updateUser = async (data, userId) =>
    await DB.findByIdAndUpdate(ModelName, data, userId, ["-password"]);

  static deleteUser = async userId =>
    await DB.findByIdAndDelete(ModelName, userId, { model: "Task", id: { userId } } );
};

module.exports = UserService;
