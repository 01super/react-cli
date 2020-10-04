import React, { useEffect } from 'react';
import mp4 from '@/assets/jest.mov';
import style from './style.less';
import data from './data';
import VideoDanmu from './VideoDanmu';

function Home(): JSX.Element {
  let danmuVideo: HTMLVideoElement;
  let danmuCanvas: HTMLCanvasElement;
  let videoDanmu: VideoDanmu;
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function init() {
    danmuCanvas = document.querySelector('#canvas') as HTMLCanvasElement;
    danmuVideo = document.querySelector('#video') as HTMLVideoElement;
    videoDanmu = new VideoDanmu(danmuCanvas, danmuVideo, data);
    bindEvent();
  }

  function bindEvent() {
    danmuVideo.addEventListener('play', handleVideoPlay, false);
    danmuVideo.addEventListener('pause', handleVidelPaused, false);
  }

  function handleVideoPlay() {
    videoDanmu.videoPaused = false;
    videoDanmu.render();
  }

  function handleVidelPaused() {
    videoDanmu.videoPaused = true;
  }

  return (
    <main className={style.main}>
      <section className={style.videoWrapper}>
        <canvas id="canvas" className={style.danmuCanvas} />
        <video id="video" src={mp4} controls className={style.danmuVideo} />
      </section>
      <section className={style.tools}>
        <input type="text" className={style.input} />
        <input type="color" className={style.color} />
        <input type="button" value="发送" className={style.btn} />
      </section>
    </main>
  );
}

export default Home;
