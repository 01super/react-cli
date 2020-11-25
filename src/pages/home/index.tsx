import React from 'react';
import Mime from '@/pages/mine';

const Home: React.FC = () => {
  const [title, setTitle] = React.useState(99);

  const handleClick = (): void => {
    setTitle((pre) => pre + 1);
  };

  return (
    <section>
      <div onClick={handleClick}>{title}</div>
      <div>909也uu00000</div>
      <div>xxxxx de des111sssssw swsw</div>
      <Mime />
    </section>
  );
};
export default Home;
