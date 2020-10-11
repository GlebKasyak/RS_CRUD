const DB = require("../../common/database");

const ModelName = "Task";

class TaskService {
  static getAllTasks = async boardId => await DB.find(ModelName, { boardId });

  static addTask = async (data, boardId) =>
    await DB.create(ModelName, { ...data, boardId }, { model: "Board", boardId });

  static getTaskByIds = async ids => await DB.findById(ModelName, ids);

  static updateTaskByIds = async (data, ids) => await DB.findByIdAndUpdate(ModelName, data, ids);

  static deleteTaskByIds = async ids => await DB.findByIdAndDelete(ModelName, ids);
};

module.exports = TaskService;
