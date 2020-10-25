const { Schema, model } = require('mongoose');

const Task = require('../tasks/task.model');

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5
    },
    columns: [
      {
        title: {
          type: String,
          trim: true
        },
        order: {
          type: Number
        }
      }
    ]
  },
  {
    versionKey: false
  }
);

BoardSchema.post('remove', async board => {
  await Task.deleteMany({ boardId: board._id });
});

const Board = model('Board', BoardSchema);
module.exports = Board;
