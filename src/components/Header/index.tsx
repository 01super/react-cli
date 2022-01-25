import React, { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Dropdown, Layout } from 'antd';
import useCommonState from '@/store/commom';
import style from './style.less';

const Header: FC = () => {
    const navigate = useNavigate();

    const { userInfo } = useCommonState.useContainer();
    const logout = () => {
        navigate('/login');
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
            <Link to="/" className={style.logo}>
                <img className={style.logoImg} src="" alt="" />
                <h1 className={style.logoTitle}>管理后台</h1>
            </Link>
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
