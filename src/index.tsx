import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import {store} from "./store";
import {draw} from "./automaton/canvas";
import {initialize, getNext} from "./automaton/Automaton";
import * as strategies from "./automaton/strategies";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

const targetCanvas = document.getElementById("canvas") as HTMLCanvasElement;
targetCanvas.width = document.body.clientWidth;
targetCanvas.height = document.body.clientHeight;

const CELL_SIZE = 10;
const PATTERN_WIDTH = 60;
const PATTERN_HEIGHT = 60;

let cells = initialize(PATTERN_WIDTH, PATTERN_HEIGHT);

const d = () => {
  draw({
    width: CELL_SIZE * PATTERN_WIDTH,
    height: CELL_SIZE * PATTERN_HEIGHT,
    cellSize: CELL_SIZE,
    target: targetCanvas,
    cells
  });
  cells = getNext(cells, strategies.DazzleStrategy);

  requestAnimationFrame(d);
};

d();

window.onclick = () => {
  cells = initialize(PATTERN_WIDTH, PATTERN_HEIGHT);
}
