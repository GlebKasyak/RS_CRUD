const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const { select, throwErrorsByEntityIds } = require('./utils');
const { subString, findEntityByIds } = require('./helpers');

const dbEntities = {
  User: 'users',
  Board: 'boards',
  Task: 'tasks'
};

const Models = { User, Board, Task };

class DB {
  constructor() {
    this.users = [
      {
        id: 'd45f2d25-7737-4e2a-9ec5-258aadd4f8d5',
        name: 'string',
        login: 'string'
      }
    ];
    this.boards = [
      {
        id: 'fbe75b41-3bae-4c35-8d65-4bad72fb335c',
        title: 'string',
        columns: [
          {
            title: 'string',
            order: 0,
            id: '9a13b191-87ff-4081-904e-e0fca0ae2c9b'
          }
        ]
      }
    ];
    this.tasks = [
      {
        id: '2a0c7769-a508-42d7-8f26-2bace8cd3b92',
        title: 'string',
        order: 0,
        description: 'string',
        userId: 'd45f2d25-7737-4e2a-9ec5-258aadd4f8d5',
        boardId: 'fbe75b41-3bae-4c35-8d65-4bad72fb335c',
        columnId: 'string'
      }
    ];
  }

  create(Model, data, relationshipObj, fields) {
    if (relationshipObj) {
      const keys = Object.keys(relationshipObj);
      const values = Object.values(relationshipObj);

      const modelName = relationshipObj[keys[0]];
      const relationshipId = values[1];

      const entityIndex = this[dbEntities[modelName]].findIndex(
        entity => entity.id === relationshipId
      );
      if (entityIndex === -1) {
        const currentEntities = dbEntities[modelName];
        const entityName = subString(
          currentEntities,
          0,
          currentEntities.length - 1
        );
        throw new Error(
          `Error! ${entityName} with id = ${relationshipId} doesn't exists`
        );
      }
    }

    const entity = Models[Model].create(data);
    this[dbEntities[Model]].push(entity);

    return select(entity, fields);
  }

  find(Model, searchObj, fields) {
    let entities;
    if (!searchObj) {
      entities = this[dbEntities[Model]];
    } else {
      const key = Object.keys(searchObj)[0];
      const value = Object.values(searchObj)[0];

      entities = this[dbEntities[Model]].filter(
        entity => entity[key] === value
      );
    }

    return select(entities, fields);
  }

  findById(Model, ids, fields) {
    const currentEntities = dbEntities[Model];
    // eslint-disable-next-line no-shadow
    const entity = this[currentEntities].find(entity =>
      findEntityByIds(entity, ids)
    );

    if (entity === undefined) {
      const entityName = subString(
        currentEntities,
        0,
        currentEntities.length - 1
      );
      throwErrorsByEntityIds(ids, entityName);
    } else {
      return select(entity, fields);
    }
  }

  findByIdAndUpdate(Model, data, ids, fields) {
    const currentEntities = dbEntities[Model];
    const entityIndex = this[currentEntities].findIndex(entity =>
      findEntityByIds(entity, ids)
    );

    if (entityIndex === -1) {
      const entityName = subString(
        currentEntities,
        0,
        currentEntities.length - 1
      );
      throwErrorsByEntityIds(ids, entityName);
    } else {
      const isEmptyFields = Object.values(data).every(field => !Boolean(field));

      if (isEmptyFields) {
        throw new Error('Error!Body data is empty');
      }

      for (const key in data) {
        if (!Boolean(data[key])) {
          delete data[key];
        }
      }

      this[currentEntities] = this[currentEntities].map((entity, index) => {
        if (index === entityIndex) {
          return {
            ...entity,
            ...data
          };
        }
        return entity;
      });

      return select(this[currentEntities][entityIndex], fields);
    }
  }

  findByIdAndDelete(Model, ids, relationshipObject) {
    const currentEntities = dbEntities[Model];
    const entityIndex = this[currentEntities].findIndex(entity =>
      findEntityByIds(entity, ids)
    );

    const entityName = subString(
      currentEntities,
      0,
      currentEntities.length - 1
    );

    if (entityIndex === -1) {
      throwErrorsByEntityIds(ids, entityName);
    } else {
      if (relationshipObject) {
        const relationshipEntities = dbEntities[relationshipObject.model];
        const idName = Object.keys(relationshipObject.id)[0];
        const idValue = Object.values(relationshipObject.id)[0];

        this[relationshipEntities] = Models[relationshipObject.model].delete(
          this[relationshipEntities],
          idName,
          idValue
        );
      }
      this[currentEntities].splice(entityIndex, 1);
    }
  }
}

module.exports = new DB();
