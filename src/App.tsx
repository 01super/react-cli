import React, { lazy, memo } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GlobalStateProvider from '@/store/GlobalStateProvider';
import Layout from '@/components/Layout';
import routes, { RouteType } from '@/router.config';
import Login from '@/pages/login';
import Home from '@/pages/home';

const NotFound = lazy(() => import('@/pages/error'));

// TODO 判断权限，没有权限跳转 403
const renderRoute = (r: RouteType[]): React.ReactNode =>
    r.map(({ routes: rt, component: Component, path }) =>
        Component ? (
            <Route path={path} key={path} element={<Component />} />
        ) : (
            rt && renderRoute(rt)
        ),
    );

const App: React.FC = () => (
    <GlobalStateProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </GlobalStateProvider>
);

export default memo(App);
