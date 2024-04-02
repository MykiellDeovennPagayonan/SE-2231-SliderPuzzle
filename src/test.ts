import Board from "./classes/board";
import { MinHeap } from "min-heap-typed";
import { readFileSync } from "fs";

const fileName: string = "puzzle02.txt";

const lines: string[] = readFileSync(`./puzzles/${fileName}`, "utf8").split(
    "\n"
);
const n: number = parseInt(lines[0]);
const tiles: number[][] = Array(n).fill(Array(n));

lines.forEach((line, row) => {
    if (row === 0) {
        return;
    }

    const nums = line
        .split(" ")
        .map((s) => parseInt(s))
        .filter((x) => !isNaN(x));

    if (nums.length === 0) {
        return;
    }

    tiles[row - 1] = nums;
});


const initial: Board = new Board(tiles);

class SearchNode {
  board: Board;
  moves: number;
  manhattan: number;
  previousSearchNode: SearchNode | null;

  constructor(board : Board, moves: number, previousSearchNode: SearchNode | null = null) {
    this.board = board;
    this.moves = moves;
    this.manhattan = board.manhattan()
    this.previousSearchNode = previousSearchNode;
  }

  priority(): number {
    return this.moves + this.manhattan;
  }
}

const heap = new MinHeap<SearchNode>([], {
  comparator: (a, b) => a.priority() - b.priority(),
});

const node1 = new SearchNode(initial, 13);
const node2 = new SearchNode(initial, 15);
const node3 = new SearchNode(initial, 8);

heap.add(node1);
heap.add(node2);
heap.add(node3);

console.log(heap.peek());
let hallo = heap.poll();
console.log(hallo, "yas")