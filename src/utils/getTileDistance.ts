export default function getTileDistance(
  x: number,
  y: number,
  tile: number,
  goalBoard: number[][]
): number {
  for (let i = 0; i < goalBoard.length; i++) {
    for (let j = 0; j < goalBoard[i].length; j++) {
      if (tile === goalBoard[i][j]) {
        return Math.abs(i - y) + Math.abs(j - x) 
      }
    }
  }

  return 0;
}
