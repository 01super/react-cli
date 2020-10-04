import React from 'react';
import mp4 from '@/assets/jest.mov';
import style from './style.less';

function Home(): JSX.Element {
  return (
    <main className={style.main}>
      <section className={style.videoWrapper}>
        <canvas className={style.danmuVideo} />
        <video src={mp4} controls className={style.danmuCanvas} />
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
