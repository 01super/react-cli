import VideoDanmu from './VideoDanmu';

class Danmu {
  content: string;

  ctx: VideoDanmu;

  runTime: number;

  danmu: DanmuData;

  color: any;

  speed: any;

  fontSize = 30;

  width = 0;

  X = 0;

  Y = 0;

  isInitialized = false;

  stopDrawing = false;

  constructor(danmu: DanmuData, fCtx: VideoDanmu) {
    this.content = danmu.content;
    this.runTime = danmu.runTime;
    this.danmu = danmu;
    this.ctx = fCtx;
    this.initialzed();
  }

  initialzed(): void {
    this.color = this.danmu.color || this.ctx.color;
    this.speed = this.danmu.speed || this.ctx.speed;
    this.width = this.getContentWidth();
    this.getContentPosition();
  }

  // 获取弹幕的宽度
  getContentWidth(): number {
    const span = document.createElement('span');
    span.innerText = this.content;
    span.style.position = 'absolute';
    document.body.appendChild(span);
    const width = span.offsetWidth;
    span.remove();
    return width;
  }

  // 获取弹幕的位置
  getContentPosition(): void {
    this.X = this.ctx.canvas.width;
    let Y = this.ctx.canvas.height * Math.random();
    Y < this.fontSize && (Y = this.fontSize);
    Y > this.ctx.canvas.height - this.fontSize && (Y = this.ctx.canvas.height - this.fontSize);
    this.Y = Y;
  }

  // 画弹幕
  draw(): void {
    this.ctx.canvasCtx.font = `${this.fontSize}px Microsoft Yahei`;
    this.ctx.canvasCtx.fillStyle = this.color;
    this.ctx.canvasCtx.fillText(this.content, this.X, this.Y);
  }
}

export default Danmu;
