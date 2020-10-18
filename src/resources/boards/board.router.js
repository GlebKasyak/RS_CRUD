const { Router } = require('express');

const BoardController = require('./board.controller');
const { loggerMiddleware } = require('../../middleware/logger/logger');

const router = Router();
const logger = loggerMiddleware('BoardController');

router.get('/', logger, BoardController.getAllBoards);
router.post('/', logger, BoardController.addBoard);
router.get('/:boardId', logger, BoardController.getBoardById);
router.put('/:boardId', logger, BoardController.updateBoard);
router.delete('/:boardId', logger, BoardController.deleteBoard);

module.exports = router;
