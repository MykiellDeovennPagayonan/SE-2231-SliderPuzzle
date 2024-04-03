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
    let counter = 50

    while (counter < 10000) {
      let solvedBoard = this.solve(this.initialBoard, counter)

      if (solvedBoard) {
        return true
      }

      let solvedTwinBoard = this.solve(this.twinBoard, counter)

      if (solvedTwinBoard) {
        return false
      }

      counter += 50
    }

    return false
  }

  // min number of moves to solve initial board; -1 if unsolvable
  moves(): number {
    if (!this.isSolvable()) {
      return -1
    }
    
    let counter = 0

    let node = this.solve(this.initialBoard)

    if (node) {
      while (node.previousSearchNode) {
        node = node.previousSearchNode
        counter++
      }

      return counter
    }

    return -1;
  }

  // sequence of boards in a shortest solution; null if unsolvable
  solution(): Board[] | null {
    if (!this.isSolvable()) {
      return null
    }

    let moves : Board[] = []

    let node = this.solve(this.initialBoard)

    if (node) {
      while (node.previousSearchNode) {
        moves.unshift(node.getBoard())
        node = node.previousSearchNode
      }

      return moves
    }

    return null;
  }

  solve(board: Board, counter? : number | null) : false | SearchNode {
    const heap = new MinHeap<SearchNode>([], {
      comparator: (a, b) => a.priority() - b.priority(),
    });

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

      if (counter) {
        counter--
        if (counter <= 0) {
          return false
        }
      }
    }
  }
}

export default Solver;
