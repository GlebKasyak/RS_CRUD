const { Schema, model } = require('mongoose');

const Task = require('../tasks/task.model');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 4
    },
    login: {
      type: String,
      required: true,
      trim: true,
      minLength: 4
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 4
    }
  },
  {
    versionKey: false
  }
);

UserSchema.post('remove', async user => {
  await Task.updateMany({ userId: user._id }, { userId: null });
});

const User = model('User', UserSchema);
module.exports = User;
