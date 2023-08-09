import { FC, lazy, memo, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DefaultLayout from '@/components/DefaultLayout';
// import Login from '@/pages/login';
import Home from '@/pages/home';
import Mine from '@/pages/mine';
import ZustandDemo from '@/pages/zustandDemo';
import LargeUpload from '@/pages/largeUpload';
import Optimize from '@/pages/optimize';
import logo from '@/assets/img2.png';
import routes from '@/router.config';

const { Sider, Content } = Layout;

const NotFound = lazy(() => import('@/pages/error'));

const App: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuKey, setMenuKey] = useState('/maker');
    const [openKey, setOpenKey] = useState<string[]>([]);
    // 刷新后定位菜单
    useEffect(() => {
        const data = location.pathname;
        if (data) {
            setMenuKey(data);
        }
        // eslint-disable-next-line
    }, []);

    const handleSelect = (e: any) => {
        setMenuKey(e.selectedKeys[0]);
        navigate(e.item.props.path);
    };

    const handleOpenChange = (keys: any) => {
        setOpenKey(keys as string[]);
    };
    return (
        <Layout
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Sider
                width={256}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    left: 0,
                    background: 'white',
                    zIndex: 99,
                }}
            >
                <div style={{ height: 80, padding: 0 }}>
                    <Link to="/">
                        <img style={{ width: '100%', height: '100%' }} src={logo} alt="logo" />
                    </Link>
                </div>
                <Menu
                    items={routes}
                    mode="inline"
                    onSelect={handleSelect}
                    selectedKeys={[menuKey]}
                    openKeys={openKey}
                    onOpenChange={handleOpenChange}
                />
            </Sider>
            <Content style={{ flex: 1 }}>
                <TransitionGroup>
                    {/* TODO: 使用location.pathname 还是 location.key */}
                    <CSSTransition key={location.key} classNames="fade" timeout={300}>
                        <Routes location={location}>
                            <Route path="/" element={<DefaultLayout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/mine" element={<Mine />} />
                                <Route path="/Large-upload" element={<LargeUpload />} />
                                <Route path="/zustand-demo" element={<ZustandDemo />} />
                                <Route path="/optimize" element={<Optimize />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
                {/* <Routes> */}
                {/*    <Route path="/login" element={<Login />} /> */}
                {/* </Routes> */}
            </Content>
        </Layout>
    );
};

export default memo(App);
