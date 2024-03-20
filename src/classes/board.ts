import createGoalBoard from "../utils/createGoalBoard";
import getTileDistance from "../utils/getTileDistance";

class Board {
    tiles: number[][] = [[0]];
    goalBoard: number[][] = [[0]]

    constructor(tiles: number[][]) {
        this.tiles = tiles

        this.goalBoard = createGoalBoard(tiles.length)
    }

    toString(): string {
        let maxDigits = ((this.tiles.length**2) - 1).toString().length
        let boardString = `${this.tiles.length} \n `

        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                const spaceAdd = maxDigits - this.tiles[i][j].toString().length

                if (spaceAdd > 0) {
                    for (let k = 0; k <spaceAdd; k++) {
                        boardString += " " 
                    }
                }

                boardString += this.tiles[i][j] + " "
            }

            boardString += `\n `
        }

        return boardString;
    }

    dimension(): number {
        return this.tiles.length;
    }

    hamming(): number {
        let hammingCounter = 0
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j] !== this.goalBoard[i][j] && this.tiles[i][j] !== 0) {
                    hammingCounter++
                }
            }
        }
        
        return hammingCounter;
    }

    // sum of Manhattan distances between tiles and goal
    manhattan(): number {
        let manhattanCounter = 0
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j] !== this.goalBoard[i][j] && this.tiles[i][j] !== 0) {
                    manhattanCounter += getTileDistance(j, i, this.tiles[i][j], this.goalBoard)
                }
            }
        }
        return manhattanCounter;
    }

    // is this board the goal board?
    isGoal(): boolean {
        return this.hamming() === 0;
    }

    // does this board equal y?
    equals(y: Board): boolean {
        // PLS MODIFY
        return true;
    }

    // all neighboring boards
    neighbors(): Board[] {
        // PLS MODIFY
        return [];
    }

    // a board that is obtained by exchanging any pair of tiles
    twin(): Board {
        // PLS MODIFY
        return new Board([[]]);
    }
}

export default Board;
