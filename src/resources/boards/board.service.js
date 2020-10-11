const DB = require('../../common/database');

const ModelName = 'Board';

class BoardService {
  static async getAllBoards() {
    return await DB.find(ModelName);
  }

  static async addBoard(data) {
    return await DB.create(ModelName, data);
  }

  static async getBoardById(boardId) {
    return await DB.findById(ModelName, boardId);
  }

  static async updateBoard(data, boardId) {
    return await DB.findByIdAndUpdate(ModelName, data, boardId);
  }

  static async deleteBoard(boardId) {
    return await DB.findByIdAndDelete(ModelName, boardId, {
      model: 'Task',
      id: { boardId }
    });
  }
}

module.exports = BoardService;
