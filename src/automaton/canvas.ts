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
        ctx.strokeStyle = "rgb(0, 64, 64)";
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 32, 32)";
        ctx.fill();
      }
    })
  );

  targetCtx.rect(0, 0, options.target.width, options.target.height);
  targetCtx.fillStyle = targetCtx.createPattern(canvas, "repeat");

  targetCtx.fill();
};
