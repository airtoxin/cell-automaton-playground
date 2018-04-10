import { range, sample, get } from "lodash";

export const initialize = (width: number, height: number): number[][] => {
  return range(0, height).map(() =>
    range(0, width).map(() => sample([0, 1]) as number)
  );
}

export type Neighbors = [
  number|undefined,
  number|undefined,
  number|undefined,
  number|undefined,
  number,
  number|undefined,
  number|undefined,
  number|undefined,
  number|undefined
  ];

export interface Strategy {
  (neighbors: Neighbors, prevNeighbors: Neighbors): number;
}

const getNeighbors = (x: number, y: number, cells: number[][]): Neighbors => {
  const cellsYLength = cells.length;
  const cellsXLength = cells[0].length;
  const g = (y: number, x: number): number =>
    get(cells, [
      (cellsYLength + y) % cellsYLength,
      (cellsXLength + x) % cellsXLength
    ]);
  return [
    g(y - 1, x - 1),
    g(y - 1, x),
    g(y - 1, x + 1),
    g(y, x - 1),
    g(y, x),
    g(y, x + 1),
    g(y + 1, x - 1),
    g(y + 1, x),
    g(y + 1, x + 1)
  ];
};

export const getNext = (cells: number[][], strategy: Strategy, prevCells: number[][]): number[][] => {
  return cells.map((row, y) =>
    row.map((_, x) => {
      return strategy(
        getNeighbors(x, y, cells),
        getNeighbors(x, y, prevCells)
      );
    })
  );
}
