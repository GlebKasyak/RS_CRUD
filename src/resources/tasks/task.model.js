const uuid = require('uuid');

const { checkRequiredFields } = require('../../common/helpers');

class Task {
  constructor({
    id = uuid(),
    title,
    order = 0,
    description,
    userId = null,
    boardId,
    columnId = null
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static create(data) {
    const canBeCreated = checkRequiredFields(data, [
      'title',
      'description',
      'boardId'
    ]);

    if (canBeCreated && !Array.isArray(canBeCreated)) {
      return new Task(data);
    }
    throw new Error(
      `Error! You missed required fields: ${canBeCreated.join(', ')}.`
    );
  }

  static delete(tasks, idName, idValue) {
    switch (idName) {
      case 'userId':
        return tasks.map(entity => {
          if (entity[idName] === idValue) {
            return {
              ...entity,
              [idName]: null
            };
          }
          return entity;
        });
      case 'boardId':
        return tasks.filter(task => task.boardId !== idValue);
      default:
        break;
    }
  }
}

module.exports = Task;
