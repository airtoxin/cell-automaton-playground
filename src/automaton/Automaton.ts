import { range, sample, get } from "lodash";

export const initialize = (width: number, height: number): number[][] => {
  return range(0, height).map(() =>
    range(0, width).map(() => sample([0, 1]) as number)
  );
}

export interface Strategy {
  (neighbors: [
    number|undefined,
    number|undefined,
    number|undefined,
    number|undefined,
    number|undefined,
    number|undefined,
    number|undefined,
    number|undefined,
    number|undefined
  ]): number;
}

export const getNext = (cells: number[][], strategy: Strategy): number[][] => {
  const cellsYLength = cells.length;
  const cellsXLength = cells[0].length;
  const g = (y: number, x: number): number =>
    get(cells, [
      (cellsYLength + y) % cellsYLength,
      (cellsXLength + x) % cellsXLength
    ]);
  return cells.map((row, y) =>
    row.map((_, x) => {
      return strategy([
        g(y - 1, x - 1),
        g(y - 1, x),
        g(y - 1, x + 1),
        g(y, x - 1),
        g(y, x),
        g(y, x + 1),
        g(y + 1, x - 1),
        g(y + 1, x),
        g(y + 1, x + 1)
      ]);
    })
  );
}

export const GameOfLifeStrategy: Strategy = neighborCells => {
  const count = neighborCells
    .filter((_, i) => i !== 4) // omit center cell
    .map(x => x ? x : 0)
    .reduce((a, x) => a + x, 0);

  if (neighborCells[4] === 1) {
    return count === 2 || count === 3 ? 1 : 0;
  } else {
    return count === 3 ? 1 : 0;
  }
};
