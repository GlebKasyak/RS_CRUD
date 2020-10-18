const { Router } = require('express');
const { loggerMiddleware } = require('../../middleware/logger/logger');

const UserController = require('./user.controller');

const router = Router();
const logger = loggerMiddleware('UserController');

router.get('/', logger, UserController.getAllUsers);
router.post('/', logger, UserController.addUser);
router.get('/:userId', logger, UserController.getUserById);
router.put('/:userId', logger, UserController.updateUser);
router.delete('/:userId', logger, UserController.deleteUser);

module.exports = router;
