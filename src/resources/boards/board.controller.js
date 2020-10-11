const BoardService = require('./board.service');
const { ErrorHandler } = require('../../common/errorHandler');

class BoardController {
  static async getAllBoards(req, res, next) {
    try {
      const boards = await BoardService.getAllBoards();
      res.status(200).send(boards);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async addBoard(req, res, next) {
    try {
      const board = await BoardService.addBoard(req.body);
      res.status(200).send(board);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async getBoardById(req, res, next) {
    try {
      const board = await BoardService.getBoardById(req.params.boardId);
      res.status(200).send(board);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(404, err.message));
    }
  }

  static async updateBoard(req, res, next) {
    try {
      const board = await BoardService.updateBoard(
        req.body,
        req.params.boardId
      );
      res.status(200).send(board);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(400, err.message));
    }
  }

  static async deleteBoard(req, res, next) {
    try {
      await BoardService.deleteBoard(req.params.boardId);
      res.status(204).send(null);
    } catch (err) {
      // eslint-disable-next-line callback-return
      next(new ErrorHandler(404, err.message));
    }
  }
}

module.exports = BoardController;
