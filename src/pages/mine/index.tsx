import React, { useState } from 'react';
import HomeStore from '@/store/home';
import MyFom from '@/pages/mine/MyFom';
import style from './style.less';

const Mine: React.FC = () => {
  const { title, setTitle } = HomeStore.useContainer();
  const [state, setState] = useState(0);
  return (
    <div className={style.name} onClick={() => setTitle('123123123')}>
      {title}
      <h1>hello world</h1>
      <h2
        onClick={(e) => {
          e.preventDefault();
          setState((pre) => pre + 1);
        }}
      >
        {state}
      </h2>
      <code>console.log(8111111188)</code>
      <div>happy ending! 1</div>
      <MyFom />
    </div>
  );
};

export default Mine;
