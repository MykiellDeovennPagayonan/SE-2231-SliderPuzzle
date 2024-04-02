import Board from "./board";
import { MinHeap } from "min-heap-typed";
import SearchNode from "./searchNode";
import newBoardNode from "../utils/newBoardNode";

class Solver {
  initialBoard: Board;
  twinBoard: Board;

  // find a solution to the initial board (using the A* algorithm)
  constructor(initial: Board) {
    this.initialBoard = initial
    this.twinBoard = initial.twin()

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

  solve(board: Board) : boolean | SearchNode {
    const heap = new MinHeap<SearchNode>([], {
      comparator: (a, b) => a.priority() - b.priority(),
    });

    let counter = 30

    const initialSearchNode = new SearchNode(board, 0)
    heap.add(initialSearchNode)

    while (true) {
      let priorityNode = heap.poll()

      if (!priorityNode) {
        return false
      }

      
      if (priorityNode.getBoard().isGoal()) {
        return priorityNode
      }

      let newNodes = newBoardNode(priorityNode)
      newNodes.forEach(newNode => heap.add(newNode))
    }
  }
}

export default Solver;
