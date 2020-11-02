const { Schema, model } = require('mongoose');
const { sign } = require('jsonwebtoken');
const { compare, hash } = require('bcryptjs');

const Task = require('../tasks/task.model');
const { JWT_SECRET_KEY } = require('../../common/config');

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

// eslint-disable-next-line space-before-function-paren ,func-names
UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8);
  }
  next();
});

UserSchema.post('remove', async user => {
  await Task.updateMany({ userId: user._id }, { userId: null });
});

UserSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) throw new Error('Incorrect data during sign in system');
  const isMatch = await compare(password, user.password);
  if (!isMatch) throw new Error('Password is incorrect, please try again');
  return user;
};

// eslint-disable-next-line space-before-function-paren ,func-names
UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  return sign({ userId: user._id, login: user.login }, JWT_SECRET_KEY);
};

const User = model('User', UserSchema);
module.exports = User;
