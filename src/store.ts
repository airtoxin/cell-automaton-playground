import {combineReducers, createStore} from "redux";
import { createCirquitReducer, createCirquitAction } from "redux-cirquit";
import produce from "immer";
import {initialState, State} from "./state";

export interface ReduxState {
  app: State;
}

export const createAction = (producer: ((s: State) => void)) =>
  createCirquitAction<State>(produce(producer), { namespace: "app" });

export const store = createStore<ReduxState>(
  combineReducers<ReduxState>({
    app: createCirquitReducer<State>(initialState, { namespace: "app" })
  })
);
