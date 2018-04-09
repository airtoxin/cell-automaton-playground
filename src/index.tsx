import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import {createInitialStore} from "./store";
import {draw} from "./automaton/canvas";
import {setNextCells} from "./actions";

export const CELL_SIZE = 10;
export const PATTERN_WIDTH = 60;
export const PATTERN_HEIGHT = 60;

const store = createInitialStore(PATTERN_WIDTH, PATTERN_HEIGHT);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

requestAnimationFrame(() => {
  store.dispatch(setNextCells());
});

const targetCanvas = document.getElementById("canvas") as HTMLCanvasElement;
targetCanvas.width = document.body.clientWidth;
targetCanvas.height = document.body.clientHeight;

store.subscribe(() => {
  draw({
    width: CELL_SIZE * PATTERN_WIDTH,
    height: CELL_SIZE * PATTERN_HEIGHT,
    cellSize: CELL_SIZE,
    target: targetCanvas,
    cells: store.getState().app.cells
  });

  requestAnimationFrame(() => {
    store.dispatch(setNextCells());
  });
});
