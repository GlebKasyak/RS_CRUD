const Board = require('./board.model');

class BoardService {
  static _toResponse({ _id, title, columns }) {
    return {
      id: _id,
      title,
      columns
    };
  }

  static async getAllBoards() {
    return await Board.aggregate([
      { $project: { _id: 0, id: '$_id', title: 1, columns: 1 } }
    ]);
  }

  static async addBoard(data) {
    const board = await Board.create(data);
    if (!board) throw new Error('Error: can not create board');
    return this._toResponse(board);
  }

  static async getBoardById(boardId) {
    const board = await Board.findById(boardId);
    if (!board) throw new Error('Error. Board not founded');
    return this._toResponse(board);
  }

  static async updateBoard(data, boardId) {
    const board = await Board.findByIdAndUpdate(boardId, data, {
      new: true
    });
    if (!board) throw new Error('Error! Board data not changed');
    return this._toResponse(board);
  }

  static async deleteBoard(boardId) {
    const board = await Board.findOneAndRemove({ _id: boardId });
    if (!board) {
      throw new Error(`Error: Board with id: ${boardId} doesn't exists`);
    }
    await board.remove();
  }
}

module.exports = BoardService;
