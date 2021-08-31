import React, { lazy, memo, Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import GlobalStateProvider from '@/store/GlobalStateProvider';
import Layout from '@/components/Layout';
import routes, { RouteType } from '@/router.config';
import Login from '@/pages/login';

const NotFound = lazy(() => import('@/pages/error'));

// TODO 判断权限，没有权限跳转 403
const renderRoute = (r: RouteType[]): any =>
  r.map(({ routes: rt, component: Component, path }) =>
    Component ? (
      <Route path={path} key={path} exact>
        <Component />
      </Route>
    ) : (
      rt && renderRoute(rt)
    )
  );

const App: React.FC = () => (
  <GlobalStateProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Layout>
          <Suspense fallback="loading ...">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/user/user" />
              </Route>
              {renderRoute(routes)}
              <Route>
                <NotFound status={404} />
              </Route>
            </Switch>
          </Suspense>
        </Layout>
      </Switch>
    </BrowserRouter>
  </GlobalStateProvider>
);

export default memo(App);
