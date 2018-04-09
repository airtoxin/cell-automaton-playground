import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import {store} from "./store";
import {draw} from "./automaton/canvas";
import {initialize} from "./automaton/Automaton";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

const targetCanvas = document.getElementById("canvas") as HTMLCanvasElement;
targetCanvas.width = document.body.clientWidth;
targetCanvas.height = document.body.clientHeight;

const cells = initialize(100, 100);

draw({
  width: 100,
  height: 100,
  cellSize: 5,
  target: targetCanvas,
  cells
});
