const DB = require('../../common/database');

const ModelName = 'Task';

class TaskService {
  static async getAllTasks(boardId) {
    return await DB.find(ModelName, { boardId });
  }

  static async addTask(data, boardId) {
    return await DB.create(
      ModelName,
      { ...data, boardId },
      { model: 'Board', boardId }
    );
  }

  static async getTaskByIds(ids) {
    return await DB.findById(ModelName, ids);
  }

  static async updateTaskByIds(data, ids) {
    return await DB.findByIdAndUpdate(ModelName, data, ids);
  }

  static async deleteTaskByIds(ids) {
    return await DB.findByIdAndDelete(ModelName, ids);
  }
}

module.exports = TaskService;
