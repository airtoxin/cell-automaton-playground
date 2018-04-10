import {Neighbors, Strategy} from "./Automaton";

const getCenter = (neighbors: Neighbors): number => neighbors[4];
const sum = (neighbors: Neighbors): number =>
  neighbors.map(x => x ? x : 0).reduce((a, x) => a + x, 0);
const count = (neighbors: Neighbors, state: number): number =>
  neighbors.filter(n => n === state).length;

// Cell state = 0 | 1
export const GameOfLifeStrategy: Strategy = neighbors => {
  const total = sum(neighbors) - getCenter(neighbors);

  if (neighbors[4] === 1) {
    return total === 2 || total === 3 ? 1 : 0;
  } else {
    return total === 3 ? 1 : 0;
  }
};

// Cell state = 0 | 1
export const VoteStrategy: Strategy = neighbors => {
  const total = sum(neighbors);

  if (total === 4 || total === 5) return getCenter(neighbors) === 1 ? 0 : 1;
  if (total < 4) return 0;
  return 1;
};

// Cell state = 0 | 1
export const NeonStrategy: Strategy = neighbors => {
  const total = sum(neighbors);

  return (total === 0 || total === 9) ? 1 : 0;
};

// Cell state = 0 | 1
export const DazzleStrategy: Strategy = neighbors => {
  const total = sum(neighbors);

  return total > 4 ? 1 : 0;
};

// Cell state = 0 ~ 1
export const WaveStrategy: Strategy = (neighbors, prevNeibors) => {
  const avg = (sum(neighbors) - getCenter(neighbors)) / 8;
  const next = (getCenter(neighbors) + avg - getCenter(prevNeibors)) % 1;
  if (next <= 0) return 0;
  if (next >= 1) return 1;
  return next;
};

// Cell state = 0 | 0.5 | 1
export const BrianBrainStrategy: Strategy = neighbors => {
  const self = getCenter(neighbors);
  const cnt = count(neighbors, 1);

  if (self === 1) return 0.5;
  if (self === 0.5) return 0;
  if (self === 0 && cnt === 2) return 1;
  return 0;
};
