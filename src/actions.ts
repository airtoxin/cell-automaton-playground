import {createAction} from "./store";
import {getNext, initialize} from "./models/Automaton";
import * as strategies from "./models/strategies";

export const setRandomBitCells = () => createAction(state => {
  state.cells = initialize(state.boardSize.width, state.boardSize.height);
});

export const setNextCells = () => createAction(state => {
  const prev = state.prevCells;
  state.prevCells = state.cells;
  state.cells = getNext(state.cells, state.strategy, prev);
});

export const setCellSize = (size: number) => createAction(state => {
  state.cell.size = size <= 0 ? 1 : size;
});

export const setBoardSize = ({ width, height }: { width?: number, height?: number }) => createAction(state => {
  if (width) state.boardSize.width = width;
  if (height) state.boardSize.height = height;
});

export const setStrategy = (strategyName: string) => createAction(state => {
  if ((strategies as any)[strategyName]) state.strategy = (strategies as any)[strategyName];
});
