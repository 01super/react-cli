import React, { FC } from 'react';
import { Menu, Dropdown, Layout } from 'antd';
import useCommonState from '@/store/commom';
import style from './style.less';

const Header: FC = () => {
  const { userInfo } = useCommonState.useContainer();
  const logout = async () => {
    location.href = '/login';
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>
        <span>退出登录12</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={style.header}>
      <div className={style.logo}>
        <img
          className={style.logoImg}
          src=""
          alt=""
          onClick={() => {
            location.href = '/';
          }}
        />
        <h1 className={style.logoTitle}>管理后台</h1>
      </div>
      {userInfo?.name && (
        <Dropdown className={`fr ${style.content}`} overlay={menu}>
          <span className={style.user}>
            <span className="avatar">{userInfo.name}</span>
          </span>
        </Dropdown>
      )}
    </Layout.Header>
  );
};
export default Header;
