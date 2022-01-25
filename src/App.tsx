import React, { lazy, memo, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GlobalStateProvider from '@/store/GlobalStateProvider';
import Layout from '@/components/Layout';
import routes, { RouteType } from '@/router.config';
import Login from '@/pages/login';

const NotFound = lazy(() => import('@/pages/error'));

// TODO 判断权限，没有权限跳转 403
const renderRoute = (r: RouteType[]): any =>
  r.map(({ routes: rt, component: Component, path }) =>
    Component ? (
      <Route path={path} key={path}>
        <Component />
      </Route>
    ) : (
      rt && renderRoute(rt)
    )
  );

const App: React.FC = () => (
  <GlobalStateProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<div>hello world!</div>}></Route>
        </Route>
        {/* <Route element={<Layout />}>
          <Route path='/'>
            <Suspense fallback="loading ...">
                <Routes>
                  <Route path="/" render={() => <Redirect to="/user/user" />} />
                  {renderRoute(routes)}
                  <Route>
                    <NotFound status={404} />
                  </Route>
                </Routes>
            </Suspense>
          </Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  </GlobalStateProvider>
);

export default memo(App);
