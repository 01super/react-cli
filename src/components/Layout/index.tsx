import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../Header';
import Menu from './Menu';
import Loading from './Loading';
import style from './style.less';

const { Content, Sider } = Layout;

const DefaultLayout: FC = () => (
    // 刷新后定位菜单
    <Layout className={style.layout}>
        <Header />
        <Layout>
            <Sider width={256} className={style.sider}>
                <Menu />
            </Sider>
            <Layout className={style.content}>
                {/* <Breadcrumb /> */}
                <Content className={style.main}>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    </Layout>
);
export default DefaultLayout;
