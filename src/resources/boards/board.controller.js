const BoardService = require("./board.service");
const { ErrorHandler } = require("../../common/errorHandler");

class BoardController {
  static getAllBoards = async (req, res, next) => {
    try {
      const boards = await BoardService.getAllBoards();
      res.status(200).send(boards);
    } catch(err) {
      next(new ErrorHandler(400, err.message));
    }
  };

  static addBoard = async (req, res, next) => {
    try {
      const board = await BoardService.addBoard(req.body);
      res.status(200).send(board);
    } catch(err) {
      next(new ErrorHandler(400, err.message));
    }
  };

  static getBoardById = async (req, res, next) => {
    try {
      const board = await BoardService.getBoardById(req.params.boardId);
      res.status(200).send(board);
    } catch(err) {
      next(new ErrorHandler(404, err.message));
    }
  };

  static updateBoard = async (req, res, next) => {
    try {
      const board = await BoardService.updateBoard(req.body, req.params.boardId);
      res.status(200).send(board);
    } catch(err) {
      next(new ErrorHandler(400, err.message));
    }
  };

  static deleteBoard = async (req, res, next) => {
    try {
      await BoardService.deleteBoard(req.params.boardId);
      res.status(204).send(null);
    } catch(err) {
      next(new ErrorHandler(404, err.message));
    }
  };
};

module.exports = BoardController;
