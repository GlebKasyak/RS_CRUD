const { Router } = require('express');

const BoardController = require('./board.controller');

const router = Router();

router.get('/', BoardController.getAllBoards);
router.post('/', BoardController.addBoard);
router.get('/:boardId', BoardController.getBoardById);
router.put('/:boardId', BoardController.updateBoard);
router.delete('/:boardId', BoardController.deleteBoard);

module.exports = router;
