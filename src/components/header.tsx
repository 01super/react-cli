import React from 'react';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import styles from './header.less';

const Header: JSX.Element = () => {
  const fn = (a) => {
    new Set([1, 2, 3]);
    console.log(5555);
    const a = 123;
    a = 432;
    console.log('a: ', a);
  };

  fn();

  React.useEffect(() => {
    console.log(fn);
  }, []);

  return (
    <>
      <header className={styles.hh} style={{ color: 'red', fontSize: 30 }}>
        Header test
      </header>
      <section>
        <h2>url-loader test</h2>
        <label htmlFor="img1">大于8k</label>
        <img src={img1} id="img1" />
        <label htmlFor="img2">小于8k</label>
        <img src={img2} id="img2" />
      </section>
    </>
  );
};

export default Header;
