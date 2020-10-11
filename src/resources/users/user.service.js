const DB = require('../../common/database');

const ModelName = 'User';

class UserService {
  static async getAllUsers() {
    return await DB.find(ModelName, null, ['-password']);
  }

  static async addUser(data) {
    return await DB.create(ModelName, data, null, ['-password']);
  }

  static async getUserById(userId) {
    return await DB.findById(ModelName, userId, ['-password']);
  }

  static async updateUser(data, userId) {
    return await DB.findByIdAndUpdate(ModelName, data, userId, ['-password']);
  }

  static async deleteUser(userId) {
    return await DB.findByIdAndDelete(ModelName, userId, {
      model: 'Task',
      id: { userId }
    });
  }
}

module.exports = UserService;
