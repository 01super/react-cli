import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import Menu from './Menu';
import style from './style.less';
import Breadcrumb from '@/components/Layout/Breadcrumb';

const { Content, Sider } = Layout;

const DefaultLayout: React.FC = ({ children }) => {
  // 刷新后定位菜单
  useEffect(() => {
    // const data = location.pathname;
    // if (data) {
    //   setMenuKey(data);
    // }
  }, []);

  return (
    <Layout className={style.layout}>
      <Header />
      <Layout>
        <Sider width={256} className={style.sider}>
          <Menu />
        </Sider>
        <Layout className={style.content}>
          <Breadcrumb />
          <Content className={style.main}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
