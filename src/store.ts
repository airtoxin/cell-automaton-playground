import {combineReducers, createStore} from "redux";
import { createCirquitReducer, createCirquitAction } from "redux-cirquit";
import produce from "immer";
import {initialize, Strategy} from "./automaton/Automaton";
import {DazzleStrategy} from "./automaton/strategies";

export interface ReduxStore {
  app: State;
}

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
  strategy: DazzleStrategy
};

export const createAction = (producer: ((s: State) => void)) =>
  createCirquitAction<State>(produce(producer), { namespace: "app" });

export const store = createStore<ReduxStore>(
  combineReducers<ReduxStore>({
    app: createCirquitReducer<State>(initialState, { namespace: "app" })
  })
);
