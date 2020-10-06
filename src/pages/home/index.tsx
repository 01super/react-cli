import React, { useEffect, useState } from 'react';
import mp4 from '@/assets/jest.mov';
import style from './style.less';
import data from './data';
import VideoDanmu from './VideoDanmu';

function Home(): JSX.Element {
  let danmuVideo: HTMLVideoElement;
  let danmuCanvas: HTMLCanvasElement;
  let videoDanmu: VideoDanmu;
  let oInput: HTMLInputElement;
  let oColor: HTMLInputElement;
  let oBtn: HTMLInputElement;

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function init() {
    danmuCanvas = document.querySelector('#canvas') as HTMLCanvasElement;
    danmuVideo = document.querySelector('#video') as HTMLVideoElement;
    oInput = document.querySelector('#input') as HTMLInputElement;
    oColor = document.querySelector('#color-input') as HTMLInputElement;
    oBtn = document.querySelector('#btn') as HTMLInputElement;
    videoDanmu = new VideoDanmu(danmuCanvas, danmuVideo, data);
    bindEvent();
  }

  function bindEvent() {
    danmuVideo.addEventListener('play', handleVideoPlay, false);
    danmuVideo.addEventListener('pause', handleVidelPaused, false);
    danmuVideo.addEventListener('seeked', handleVidelSeeked, false);
    oBtn.addEventListener('click', handleSendClick, false);
  }

  function handleVideoPlay() {
    videoDanmu.videoPaused = false;
    videoDanmu.render();
  }

  function handleVidelPaused() {
    videoDanmu.videoPaused = true;
  }

  // 拖动进度条事件
  function handleVidelSeeked() {
    videoDanmu.reset();
  }

  function handleSendClick() {
    if (videoDanmu.videoPaused) return;
    let { value } = oInput;
    const { value: color } = oColor;
    if (!value) return;
    value = value.trim();
    const { currentTime } = videoDanmu.video;
    const _data: DanmuData = {
      content: value,
      color,
      runTime: currentTime,
      speed: 2
    };
    videoDanmu.addDanmu(_data);
    oInput.value = '';
  }

  const [state, setState] = useState(0);

  function animate(el: HTMLDivElement): void {
    if (state !== 0) return;
    console.log('state: ', state);
    el.style.width = `${el.offsetWidth + 10}px`;
    requestAnimationFrame(() => animate(el));
  }

  useEffect(() => {
    const box = document.querySelector('#box') as HTMLDivElement;
    requestAnimationFrame(() => animate(box));
    setTimeout(() => {
      setState(1);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={style.main}>
      <section className={style.videoWrapper}>
        <canvas id="canvas" className={style.danmuCanvas} />
        <video id="video" src={mp4} controls className={style.danmuVideo} />
      </section>
      <section className={style.tools}>
        <input id="input" type="text" className={style.input} />
        <input id="color-input" type="color" className={style.color} />
        <input id="btn" type="button" value="发送" className={style.btn} />
      </section>
      <section>
        <div className={style.box} id="box" />
      </section>
      <div
        onClick={() => {
          setState((pre: number) => pre + 1);
          console.log('times', times);
        }}
      >
        {state}
      </div>
    </main>
  );
}

export default Home;
