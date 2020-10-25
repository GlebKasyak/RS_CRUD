const { Schema, model, Types } = require('mongoose');

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5
    },
    order: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 5
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      default: null
    },
    boardId: {
      type: Types.ObjectId,
      ref: 'Board',
      required: true
    },
    columnId: {
      type: Types.ObjectId,
      ref: 'Column',
      default: null
    }
  },
  {
    versionKey: false
  }
);

const Task = model('Task', TaskSchema);

module.exports = Task;
