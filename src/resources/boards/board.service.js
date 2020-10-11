const DB = require("../../common/database");

const ModelName = "Board";

class BoardService {
  static getAllBoards = async () => await DB.find(ModelName);

  static addBoard = async data => await DB.create(ModelName, data);

  static getBoardById = async boardId => await DB.findById(ModelName, boardId);

  static updateBoard = async (data, boardId) => await DB.findByIdAndUpdate(ModelName, data, boardId);

  static deleteBoard = async boardId => await DB.findByIdAndDelete(ModelName, boardId, { model: "Task", id: { boardId } } );
};

module.exports = BoardService;
