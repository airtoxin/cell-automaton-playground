import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import {store} from "./store";
import {draw} from "./canvas";
import {setNextCells, setRandomBitCells} from "./actions";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
const targetCanvas = document.getElementById("canvas") as HTMLCanvasElement;
targetCanvas.width = document.body.clientWidth;
targetCanvas.height = document.body.clientHeight;

store.subscribe(() => {
  const { app } = store.getState();
  draw({
    width: app.cell.size * app.boardSize.width,
    height: app.cell.size * app.boardSize.height,
    cellSize: app.cell.size,
    target: targetCanvas,
    cells: store.getState().app.cells
  });
});

window.onclick = () => store.dispatch(setRandomBitCells());

const loop = () => {
  requestAnimationFrame(() => {
    store.dispatch(setNextCells());
    loop();
  });
}

loop();
