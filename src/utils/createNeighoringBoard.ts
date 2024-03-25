import Board from "../classes/board";

type Direction = "up" | "down" | "left" | "right";

export default function createNeighboringBoard(
  board: Board,
  direction: Direction,
  x0: number,
  y0: number
) {

  let newBoard = board.clone()
  let xSwap: number = x0;
  let ySwap: number = y0;

  if (direction === "up") {
    ySwap--;
  }
  if (direction === "down") {
    ySwap++;
  }
  if (direction === "left") {
    xSwap--;
  }
  if (direction === "right") {
    xSwap++;
  }

  if (xSwap >= 0 && ySwap >= 0 && xSwap < newBoard.size && ySwap < newBoard.size) {
    newBoard.getTile(xSwap, ySwap)
    newBoard.setTile(newBoard.getTile(xSwap, ySwap), x0, y0)
    newBoard.setTile(0, xSwap, ySwap)

    return newBoard
  }

  return null;
}
