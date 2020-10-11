const User = require("../resources/users/user.model");
const Board = require("../resources/boards/board.model");
const Task = require("../resources/tasks/task.model");

const { select } = require("./utils");
const { subString, findEntityByIds } = require("./helpers");

const dbEntities = {
  User: "users",
  Board: "boards",
  Task: "tasks"
};

const Models = { User, Board, Task };

class DB {
  constructor() {
    this.users = [
      {
      "id": "3a45cb66-b8ea-4076-b565-729010c6ee33",
      "name": "string",
      "login": "string",
      "password": "you are lox"
    }
    ];
    this.boards = [
      {
        id: 'testID123',
        title: 'testTitle123',
        columns: [{id:"string", title: "string", order: "integer"}]
      }
    ];
    this.tasks = [
      {
        id: 'tes',
        title: 'title123',
        order: '123',
        description: 'discript',
        userId: '3a45cb66-b8ea-4076-b565-729010c6ee33',
        boardId: "testID123",
        columnId: null
      },
      {
        id: 'ttt',
        title: 'title123',
        order: '123',
        description: 'discript',
        userId: '3a45cb66-b8ea-4076-b565-729010c6ee33',
        boardId: "testID123",
        columnId: null
      }
    ];
  };

  create(Model, data, relationshipObj, fields) {
    if(relationshipObj) {
      const keys = Object.keys(relationshipObj);
      const values = Object.values(relationshipObj);

      const modelName = relationshipObj[keys[0]];
      const relationshipId = values[1];

      const entityIndex = this[dbEntities[modelName]]
        .findIndex(entity => entity.id === relationshipId);
      if(entityIndex === -1) {
        const currentEntities = dbEntities[modelName];
        const entityName = subString(currentEntities, 0, currentEntities.length - 1);
        throw new Error(`Error! ${ entityName } with id = ${ relationshipId } doesn't exists`);
      }
    }

    const entity = Models[Model].create(data);
    this[dbEntities[Model]].push(entity);

    return select(entity, fields);
  };

  find(Model, searchObj, fields) {
    let entities;
    if(!searchObj) {
      entities = this[dbEntities[Model]];
    } else {
      const key = Object.keys(searchObj)[0];
      const value = Object.values(searchObj)[0];

      entities = this[dbEntities[Model]].filter(entity => entity[key] === value);
    }

    return select(entities, fields);
  };

  findById(Model, ids, fields) {
    const currentEntities = dbEntities[Model];
    const entity = this[currentEntities].find(entity => findEntityByIds(entity, ids));

    if(entity === undefined) {
      const entityName = subString(currentEntities, 0, currentEntities.length - 1);
      if(typeof ids === "object") {
        const params = Object.entries(ids).reduce((acc, curr) => {
          acc = acc + `${ curr[0] } = ${ curr[1] }, `
          return acc;
        }, "");

        throw new Error(`Error! ${ entityName } with params: ${ params } doesn't exists`);
      } else {
        throw new Error(`Error! ${ entityName } with id = ${ ids } doesn't exists`);
      }
    } else {
      return select(entity, fields);
    }
  };

  findByIdAndUpdate(Model, data, ids, fields) {
    const currentEntities = dbEntities[Model];
    const entityIndex = this[currentEntities].findIndex(entity => findEntityByIds(entity, ids));

    if(entityIndex === -1) {
      const entityName = subString(currentEntities, 0, currentEntities.length - 1);
      throw new Error(`Error! ${ entityName } with id = ${ ids } doesn't exists`);
    } else {
      const isEmptyFields = Object.values(data).every(field => !Boolean(field));

      if(isEmptyFields) {
        throw new Error("Error!Body data is empty")
      }

      for(const key in data) {
        if(!Boolean(data[key])) {
          delete data[key]
        }
      }

      this[currentEntities] = this[currentEntities].map((entity, index) => {
        if(index === entityIndex) {
          return {
            ...entity,
            ...data
          }
        }
        return entity;
      });

      return select(this[currentEntities][entityIndex], fields);
    }
  };

  findByIdAndDelete(Model, ids, relationshipObject) {
    const currentEntities = dbEntities[Model];
    const entityIndex = this[currentEntities].findIndex(entity => findEntityByIds(entity, ids));

    const entityName = subString(currentEntities, 0, currentEntities.length - 1);

    if(entityIndex === -1) {
      throw new Error(`Error! ${ entityName } with id = ${ ids } doesn't exists`);
    } else {
      if(relationshipObject) {
        const relationshipEntities = dbEntities[relationshipObject["model"]];
        const idName = Object.keys(relationshipObject.id)[0];
        const idValue = Object.values(relationshipObject.id)[0];

        this[relationshipEntities] = Models[relationshipObject["model"]].delete(this[relationshipEntities], idName, idValue);
      }
      this[currentEntities].splice(entityIndex, 1);
    }
  };
};


module.exports = new DB();
