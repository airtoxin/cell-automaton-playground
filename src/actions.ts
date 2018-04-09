import {createAction} from "./store";
import {getNext} from "./automaton/Automaton";

export const setNextCells = () => createAction(state => {
  state.cells = getNext(state.cells, state.strategy);
});
