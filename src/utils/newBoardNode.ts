import Board from "../classes/board";
import SearchNode from "../classes/searchNode";

export default function newBoardNode(node : SearchNode) : Array<SearchNode> {

  let board = node.getBoard()
  let moves = node.getMoves()
  let boardNodes : Array<SearchNode> = []
  let neighbors = board.neighbors()

  neighbors.forEach(neighbor => boardNodes.push(new SearchNode(neighbor, moves + 1, node)))
  boardNodes.filter(boardNode => boardNode.getBoard() !== board)

  return boardNodes
}