import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routes from '@/router.config';
import logo from '@/assets/img2.png';

const { Content, Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

const DefaultLayout: React.FC = ({ children }) => {
    const [menuKey, setMenuKey] = useState('/maker');
    const [openKey, setOpenKey] = useState<string[]>([]);
    // 刷新后定位菜单
    useEffect(() => {
        const data = location.pathname;
        if (data) {
            setMenuKey(data);
        }
    }, []);

    const handleSelect = (e: any) => {
        setMenuKey(e.selectedKeys[0]);
    };

    const handleOpenChange = (keys: any) => {
        setOpenKey(keys as string[]);
    };

    return (
        <>
            <Layout>
                <Sider
                    width={256}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        background: 'white',
                    }}
                >
                    <div style={{ height: 80, padding: 0 }}>
                        <Link to="/">
                            <img style={{ width: '100%', height: '100%' }} src={logo} alt="logo" />
                        </Link>
                    </div>
                    <Menu
                        mode="inline"
                        onSelect={handleSelect}
                        selectedKeys={[menuKey]}
                        openKeys={openKey}
                        onOpenChange={handleOpenChange}
                    >
                        {routes.map((item) => {
                            if (item.subRoutes) {
                                return (
                                    <SubMenu key={item.title} icon={item.icon} title={item.title}>
                                        {item.subRoutes.map((i) => (
                                            <MenuItem key={i.path} icon={i.icon}>
                                                <Link to={i.path as string}>{i.title}</Link>
                                            </MenuItem>
                                        ))}
                                    </SubMenu>
                                );
                            }
                            return (
                                <MenuItem key={item.path} icon={item.icon}>
                                    <Link to={item.path as string}>{item.title}</Link>
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 256 }}>
                    <Content style={{ padding: 12, minHeight: '100vh' }}>{children}</Content>
                </Layout>
            </Layout>
        </>
    );
};

export default DefaultLayout;
