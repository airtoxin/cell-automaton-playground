import {createAction} from "./store";
import {getNext, initialize} from "./automaton/Automaton";

export const setRandomBitCells = () => createAction(state => {
  state.cells = initialize(state.boardSize.width, state.boardSize.height);
});

export const setNextCells = () => createAction(state => {
  state.cells = getNext(state.cells, state.strategy);
});