import Danmu from './Danmu';

class VideoDanmu {
  video: HTMLVideoElement;

  canvas: HTMLCanvasElement;

  canvasCtx: CanvasRenderingContext2D;

  videoPaused: boolean;

  data: DanmuData[];

  option: Option | undefined;

  danmuPool;

  speed: number;

  color: string;

  runTime: number;

  constructor(
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
    data: DanmuData[],
    option?: Option
  ) {
    this.video = video;
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d')!;
    this.canvas.width = video.offsetWidth;
    this.canvas.height = video.offsetHeight;
    this.videoPaused = true;
    this.data = data;
    this.speed = 2;
    this.color = '#fff';
    this.runTime = 0;
    this.danmuPool = this.createDanmuPool();
    this.option = option;
  }

  createDanmuPool(): Danmu[] {
    return this.data.map((dm) => new Danmu(dm, this));
  }

  render(): void {
    // 渲染前先清除弹幕
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawDanmu();
    !this.videoPaused && requestAnimationFrame(this.render.bind(this));
  }

  drawDanmu(): void {
    // 当前弹幕的时间应与视屏的进度时间相吻合
    const { currentTime } = this.video;
    this.danmuPool.forEach((danmu) => {
      if (danmu.runTime <= currentTime && !danmu.stopDrawing) {
        if (!danmu.isInitialized) {
          danmu.initialzed();
          danmu.isInitialized = true;
        }
        danmu.X -= danmu.speed;
        danmu.draw();
        if (danmu.X <= danmu.width * -1) {
          danmu.stopDrawing = true;
        }
      }
    });
  }
}

export default VideoDanmu;
