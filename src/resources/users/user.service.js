const User = require('./user.model');

class UserService {
  static _toResponse({ _id, name, login }) {
    return {
      id: _id,
      name,
      login
    };
  }

  static async getAllUsers() {
    return await User.aggregate([
      { $project: { _id: 0, id: '$_id', name: 1, login: 1 } }
    ]);
  }

  static async addUser(data) {
    const user = await User.create(data);
    if (!user) throw new Error('Error: Can not create user');
    return this._toResponse(user);
  }

  static async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('Error. User not founded');
    return this._toResponse(user);
  }

  static async updateUser(data, userId) {
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true
    });
    if (!user) throw new Error('Error! user data not changed');
    return this._toResponse(user);
  }

  static async deleteUser(userId) {
    const user = await User.findOneAndRemove({ _id: userId });
    if (!user) throw new Error(`Error: user with id: ${userId} doesn't exists`);
    await user.remove();
  }
}

module.exports = UserService;
