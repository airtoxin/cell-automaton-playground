export interface DrawOptions {
  width: number;
  height: number;
  cellSize: number;
  target: HTMLCanvasElement;
  cells: number[][];
}

const index = document.createElement("canvas");

export const draw = (options: DrawOptions): void => {
  const targetCtx = options.target.getContext("2d");
  if (!targetCtx) return;

  index.width = options.width;
  index.height = options.height;

  const ctx = index.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, index.width, index.height);
  // Draw cells
  options.cells.forEach((row, y) =>
    row.forEach((cell, x) => {
      ctx.beginPath();
      ctx.arc(
        x * options.cellSize + options.cellSize / 2,
        y * options.cellSize + options.cellSize / 2,
        options.cellSize / 2,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `rgba(0, 192, 192, ${cell})`;
      ctx.stroke();
      ctx.fillStyle = `rgba(0, 64, 64, ${cell})`;
      ctx.fill();
    })
  );
  // Fill up targetCanvas by cells pattern
  targetCtx.rect(0, 0, options.target.width, options.target.height);
  targetCtx.fillStyle = targetCtx.createPattern(index, "repeat");

  targetCtx.fill();
};
