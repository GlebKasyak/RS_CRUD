const uuid = require('uuid');

const { checkRequiredFields } = require('../../common/helpers');

class Board {
  constructor({ id = uuid(), title, columns = [] }) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => ({ ...column, id: uuid() }));
  }

  static create(data) {
    const canBeCreated = checkRequiredFields(data, ['title']);

    if (canBeCreated && !Array.isArray(canBeCreated)) {
      return new Board(data);
    }
    throw new Error(
      `Error! You missed required fields: ${canBeCreated.join(', ')}.`
    );
  }
}

module.exports = Board;
