const { verify } = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes');

const User = require('../../resources/users/user.model');
const { ErrorHandler } = require('../../common/error/errorHandler');
const { JWT_SECRET_KEY } = require('../../common/config');

const auth = async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const header = req.header('Authorization');
    if (!header) throw new Error('Authorization header is absent');
    const token = header.replace('Bearer ', '');
    if (!token) throw new Error('Authorization token is absent');
    const decoded = await verify(token, JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) throw new Error('There is no such users');
    // eslint-disable-next-line require-atomic-updates
    req.user = user;
    return next();
  } catch (err) {
    return next(new ErrorHandler(UNAUTHORIZED, err.message));
  }
};

module.exports = auth;
