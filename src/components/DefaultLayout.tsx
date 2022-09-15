import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

const DefaultLayout: React.FC = () => (
    <Layout>
        <Content style={{ padding: 12, minHeight: '100vh' }}>
            <Outlet />
        </Content>
    </Layout>
);

export default DefaultLayout;
