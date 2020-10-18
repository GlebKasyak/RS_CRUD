const { OK, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

const BoardService = require('./board.service');
const { ErrorHandler } = require('../../common/error/errorHandler');

class BoardController {
  static async getAllBoards(req, res, next) {
    try {
      const boards = await BoardService.getAllBoards();
      res.status(OK).send(boards);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async addBoard(req, res, next) {
    try {
      const board = await BoardService.addBoard(req.body);
      res.status(OK).send(board);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async getBoardById(req, res, next) {
    try {
      const board = await BoardService.getBoardById(req.params.boardId);
      res.status(OK).send(board);
    } catch (err) {
      return next(new ErrorHandler(NOT_FOUND, err.message));
    }
  }

  static async updateBoard(req, res, next) {
    try {
      const board = await BoardService.updateBoard(
        req.body,
        req.params.boardId
      );
      res.status(OK).send(board);
    } catch (err) {
      return next(new ErrorHandler(BAD_REQUEST, err.message));
    }
  }

  static async deleteBoard(req, res, next) {
    try {
      await BoardService.deleteBoard(req.params.boardId);
      res.status(NO_CONTENT).send(null);
    } catch (err) {
      return next(new ErrorHandler(NOT_FOUND, err.message));
    }
  }
}

module.exports = BoardController;
