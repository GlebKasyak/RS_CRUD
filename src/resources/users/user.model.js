const uuid = require('uuid');

const { checkRequiredFields } = require('../../common/helpers');

class User {
  constructor({ id = uuid(), name, login, password }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static create(data) {
    const canBeCreated = checkRequiredFields(data, [
      'name',
      'login',
      'password'
    ]);

    if (canBeCreated && !Array.isArray(canBeCreated)) {
      return new User(data);
    }
    throw new Error(
      `Error! You missed required fields: ${canBeCreated.join(', ')}.`
    );
  }
}

module.exports = User;
