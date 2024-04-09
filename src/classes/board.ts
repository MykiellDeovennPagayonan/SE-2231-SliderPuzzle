import * as clone from "lodash"

import createGoalBoard from "../utils/createGoalBoard";
import getTileDistance from "../utils/getTileDistance";
import createNeighboringBoard from "../utils/createNeighoringBoard";

class Board {
    public tiles: number[][] = [[0]];
    private goalBoard: number[][] = [[0]]
    public size: number = 0

    constructor(tiles: number[][]) {
        this.tiles = tiles

        this.goalBoard = createGoalBoard(tiles.length)
        this.size = tiles.length
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
        return this.size;
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
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j] !== y.tiles[i][j]) {
                    return false
                }
            }
        }
        return true;
    }

    // all neighboring boards
    neighbors(): Board[] {
        let x0 : number = -2
        let y0 : number = -2
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j] === 0) {
                    x0 = j
                    y0 = i
                }
            }
        }

        let neighboringBoards : Board[] = []

        let directions : Array<"up" | "down" | "left" | "right"> = ["up", "down", "left", "right"]

        for (let i = 0; i < directions.length; i++) {
            let neighboringBoard = createNeighboringBoard(this, directions[i], x0, y0)
            if (neighboringBoard) {
                neighboringBoards.push(neighboringBoard)
            }
        }

        return neighboringBoards;
    }

    // calc the number of inversions in the puzzle
    inversionCount(): number {
        let inversions = 0;
        const flatTiles = this.tiles.flat();
        for (let i = 0; i < flatTiles.length - 1; i++) {
            for (let j = i + 1; j < flatTiles.length; j++) {
                if (flatTiles[i] !== 0 && flatTiles[j] !== 0 && flatTiles[i] > flatTiles[j]) {
                    inversions++;
                }
            }
        }
        return inversions;
    }

    // a board that is obtained by exchanging any pair of tiles
    twin(): Board {
        let x1 = Math.floor(Math.random() * this.size)
        let x2 = Math.floor(Math.random() * this.size)
        let y1 = Math.floor(Math.random() * this.size)
        let y2 = Math.floor(Math.random() * this.size)

        while (this.tiles[y1][x1] === 0 || this.tiles[y2][x2] === 0 || (x1 === x2 && y1 === y2)) {
            x1 = Math.floor(Math.random() * this.size)
            x2 = Math.floor(Math.random() * this.size)
            y1 = Math.floor(Math.random() * this.size)
            y2 = Math.floor(Math.random() * this.size)
        }

        let clone = this.clone()
        let tileValue = this.tiles[y1][x1]
        clone.setTile(this.tiles[y2][x2], x1, y1)
        clone.setTile(tileValue, x2, y2)

        return clone;
    }

    setTile(value: number, x : number, y: number) : void {
        this.tiles[y][x] = value
    }

    clone() : Board {
        return clone.cloneDeep(this)
    }

    getTile(x : number, y: number) : number {
        return this.tiles[y][x]
    }
}

export default Board;
