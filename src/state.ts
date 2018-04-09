import {initialize, Strategy} from "./automaton/Automaton";
import * as strategies from "./automaton/strategies";

export interface State {
  boardSize: {
    width: number;
    height: number;
  };
  cell: {
    size: number;
  };
  cells: number[][];
  strategy: Strategy;
}

const WIDTH = 50;
const HEIGHT = 50;

export const initialState: State = {
  boardSize: {
    width: WIDTH,
    height: HEIGHT,
  },
  cell: {
    size: 5
  },
  cells: initialize(WIDTH, HEIGHT),
  strategy: strategies.DazzleStrategy
};
