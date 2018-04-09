export interface DrawOptions {
  width: number;
  height: number;
  cellSize: number;
  target: HTMLCanvasElement;
}

const canvas = document.createElement("canvas");

export const draw = (options: DrawOptions): void => {
  const targetCtx = options.target.getContext("2d");
  if (!targetCtx) return;

  canvas.width = options.width;
  canvas.height = options.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.beginPath();
  ctx.fillStyle = 'rgb(192, 80, 77)'; // 赤
  ctx.arc(70, 45, 35, 0, Math.PI*2, false);
  ctx.fill();

  targetCtx.rect(0, 0, options.target.width, options.target.height);
  targetCtx.fillStyle = targetCtx.createPattern(canvas, "repeat");

  targetCtx.fill();
};
