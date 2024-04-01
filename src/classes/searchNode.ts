import Board from "./board";
class SearchNode {
  board: Board;
  moves: number;
  manhattan: number;
  previousSearchNode: SearchNode | null;

  constructor(
    board: Board,
    moves: number,
    previousSearchNode: SearchNode | null = null
  ) {
    this.board = board;
    this.moves = moves;
    this.manhattan = board.manhattan();
    this.previousSearchNode = previousSearchNode;
  }

  priority(): number {
    return this.moves + this.manhattan;
  }
}

export default SearchNode