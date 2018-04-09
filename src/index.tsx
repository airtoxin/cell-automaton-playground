import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import {store} from "./store";
import {draw} from "./automaton/canvas";
import {initialize, getNext, GameOfLifeStrategy} from "./automaton/Automaton";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

const targetCanvas = document.getElementById("canvas") as HTMLCanvasElement;
targetCanvas.width = document.body.clientWidth;
targetCanvas.height = document.body.clientHeight;

let cells = initialize(60, 60);

const d = () => {
  draw({
    width: 300,
    height: 300,
    cellSize: 5,
    target: targetCanvas,
    cells
  });
  cells = getNext(cells, GameOfLifeStrategy);

  requestAnimationFrame(d);
};

d();
