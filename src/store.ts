import {combineReducers, createStore} from "redux";
import { createCirquitReducer, createCirquitAction } from "redux-cirquit";

export interface ReduxStore {
  app: State;
}

export interface State {
  cells: number[][];
}

export const initialState: State = {
  cells: []
};

export const createAction = (reducer: ((s: State) => State)) => createCirquitAction<State>(reducer, { namespace: "app" });

export const store = createStore<ReduxStore>(
  combineReducers<ReduxStore>({
    app: createCirquitReducer<State>(initialState, { namespace: "app" })
  })
);
