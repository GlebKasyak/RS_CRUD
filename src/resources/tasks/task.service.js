const { Types } = require('mongoose');

const Task = require('./task.model');

class TaskService {
  static _toResponse({ _id, ...task }) {
    return {
      id: _id,
      ...task
    };
  }

  static async getAllTasks(boardId) {
    return await Task.aggregate([
      { $match: { boardId: Types.ObjectId(boardId) } },
      {
        $project: {
          _id: 0,
          id: '$_id',
          order: 1,
          title: 1,
          description: 1,
          userId: 1,
          boardId: 1,
          columnId: 1
        }
      }
    ]);
  }

  static async addTask(data, boardId) {
    const task = await Task.create({ ...data, boardId });
    if (!task) throw new Error('Error: Can not create task');
    return this._toResponse(task.toObject());
  }

  static async getTaskByIds({ id, boardId }) {
    const task = await Task.findOne({ _id: id, boardId });
    if (!task) throw new Error('Error. Task not founded');
    return this._toResponse(task.toObject());
  }

  static async updateTaskByIds(data, { id, boardId }) {
    const task = await Task.findByIdAndUpdate({ _id: id, boardId }, data, {
      new: true
    });
    if (!task) throw new Error('Error. Task not founded');
    return this._toResponse(task.toObject());
  }

  static async deleteTaskByIds({ id, boardId }) {
    const user = await Task.findOneAndRemove({ _id: id, boardId });
    if (!user) throw new Error(`Error: Task with id: ${id} doesn't exists`);
    await user.remove();
  }
}

module.exports = TaskService;
