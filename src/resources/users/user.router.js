const { Router } = require('express');

const { loggerMiddleware, validator } = require('../../middleware');
const { newUser, userId, updateUser } = require('./user.validation');
const UserController = require('./user.controller');

const router = Router();
const logger = loggerMiddleware('UserController');

router.get('/', logger, UserController.getAllUsers);
router.post('/', logger, validator(newUser, 'body'), UserController.addUser);
router.get(
  '/:userId',
  logger,
  validator(userId, 'params'),
  UserController.getUserById
);
router.put(
  '/:userId',
  logger,
  validator(userId, 'params'),
  validator(updateUser, 'body'),
  UserController.updateUser
);
router.delete(
  '/:userId',
  logger,
  validator(userId, 'params'),
  UserController.deleteUser
);

module.exports = router;
