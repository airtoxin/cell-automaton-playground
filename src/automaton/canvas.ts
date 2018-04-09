import {getNext, initialize} from "./Automaton";
import * as strategies from "./strategies";

export interface DrawOptions {
  width: number;
  height: number;
  cellSize: number;
  target: HTMLCanvasElement;
  cells: number[][];
}

const canvas = document.createElement("canvas");

export const draw = (options: DrawOptions): void => {
  const targetCtx = options.target.getContext("2d");
  if (!targetCtx) return;

  canvas.width = options.width;
  canvas.height = options.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw cells
  options.cells.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell) {
        ctx.beginPath();
        ctx.arc(
          x * options.cellSize + options.cellSize / 2,
          y * options.cellSize + options.cellSize / 2,
          options.cellSize / 2,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = "rgb(0, 192, 192)";
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 64, 64)";
        ctx.fill();
      }
    })
  );
  // Fill up targetCanvas by cells pattern
  targetCtx.rect(0, 0, options.target.width, options.target.height);
  targetCtx.fillStyle = targetCtx.createPattern(canvas, "repeat");

  targetCtx.fill();
};

export const startDrawing = () => {
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
}
