import {combineReducers, createStore} from "redux";
import { createCirquitReducer, createCirquitAction } from "redux-cirquit";
import produce from "immer";
import {initialize, Strategy} from "./automaton/Automaton";
import {GameOfLifeStrategy} from "./automaton/strategies";

export interface ReduxStore {
  app: State;
}

export interface State {
  cells: number[][];
  strategy: Strategy;
}

export const createInitialState = (width: number, height: number): State => ({
  cells: initialize(width, height),
  strategy: GameOfLifeStrategy
});

export const createAction = (producer: ((s: State) => void)) =>
  createCirquitAction<State>(produce(producer), { namespace: "app" });

export const createInitialStore = (width: number, height: number) => createStore<ReduxStore>(
  combineReducers<ReduxStore>({
    app: createCirquitReducer<State>(createInitialState(width, height), { namespace: "app" })
  })
);
