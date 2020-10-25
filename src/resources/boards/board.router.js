const { Router } = require('express');

const BoardController = require('./board.controller');
const { boardId, newBoard } = require('./board.validation');
const { loggerMiddleware, validator } = require('../../middleware');

const router = Router();
const logger = loggerMiddleware('BoardController');

router.get('/', logger, BoardController.getAllBoards);
router.post('/', logger, validator(newBoard, 'body'), BoardController.addBoard);
router.get(
  '/:boardId',
  logger,
  validator(boardId, 'params'),
  BoardController.getBoardById
);
router.put(
  '/:boardId',
  logger,
  validator(boardId, 'params'),
  BoardController.updateBoard
);
router.delete(
  '/:boardId',
  logger,
  validator(boardId, 'params'),
  BoardController.deleteBoard
);

module.exports = router;
