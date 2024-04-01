import Board from "./board";
import { MinHeap } from "min-heap-typed";

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

const heap = new MinHeap<SearchNode>([], {
  comparator: (a, b) => a.priority() - b.priority(),
});

class Solver {
  // find a solution to the initial board (using the A* algorithm)
  constructor(initial: Board) {
    // YOUR CODE HERE
  }

  // is the initial board solvable? (see below)
  isSolvable(): boolean {
    // PLS MODIFY
    return true;
  }

  // min number of moves to solve initial board; -1 if unsolvable
  moves(): number {
    // PLS MODIFY
    return 0;
  }

  // sequence of boards in a shortest solution; null if unsolvable
  solution(): Board[] {
    // PLS MODIFY
    return [];
  }
}

export default Solver;
