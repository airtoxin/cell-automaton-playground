import {Neighbors, Strategy} from "./Automaton";

const getCenter = (neighbors: Neighbors): number => neighbors[4];
const count = (neighbors: Neighbors): number =>
  neighbors.map(x => x ? x : 0).reduce((a, x) => a + x, 0);

// Cell state = 0 | 1
export const GameOfLifeStrategy: Strategy = neighbors => {
  const cnt = count(neighbors) - getCenter(neighbors);

  if (neighbors[4] === 1) {
    return cnt === 2 || cnt === 3 ? 1 : 0;
  } else {
    return cnt === 3 ? 1 : 0;
  }
};

// Cell state = 0 | 1
export const VoteStrategy: Strategy = neighbors => {
  const cnt = count(neighbors);

  if (cnt === 4 || cnt === 5) return getCenter(neighbors) === 1 ? 0 : 1;
  if (cnt < 4) return 0;
  return 1;
};

// Cell state = 0 | 1
export const NeonStrategy: Strategy = neighbors => {
  const cnt = count(neighbors);

  return (cnt === 0 || cnt === 9) ? 1 : 0;
};

// Cell state = 0 | 1
export const DazzleStrategy: Strategy = neighbors => {
  const cnt = count(neighbors);

  return cnt > 4 ? 1 : 0;
};
