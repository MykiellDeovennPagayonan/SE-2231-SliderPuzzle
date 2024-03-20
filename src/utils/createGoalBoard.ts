export default function createGoalBoard(size: number): number[][] {
  let goalBoardInitial: number[][] = [];
  let num: number = 1;

  for (let i = 0; i < size; i++) {
    goalBoardInitial.push([]);
    for (let j = 0; j < size; j++) {
      if (i === size - 1 && j === size - 1) {
        goalBoardInitial[i].push(0);
      } else {
        goalBoardInitial[i].push(num);
        num++;
      }
    }
  }
  
  return goalBoardInitial
}
