import React from 'react';
import HomeStore from '@/store/home';

export default () => {
  const { title, setTitle } = HomeStore.useContainer();
  return <div onClick={() => setTitle('123123123')}>{title}</div>;
};
