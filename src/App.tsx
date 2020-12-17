import React, { memo, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import GlobalStateProvider from '@/store/GlobalStateProvider';
import DefaultLayout from '@/components/DefaultLayout';
import routes from '@/router.config';
import 'normalize.css';
import './global.less';

const App: React.FC = () => (
  <GlobalStateProvider>
    <BrowserRouter>
      <Switch>
        {/* <Route path="/login" exact component={Login} /> */}
        <Route
          path="/"
          render={() => (
            <DefaultLayout>
              <Suspense fallback="loading ...">
                <Switch>
                  <Route
                    path="/"
                    render={() =>
                      routes.map((route) => {
                        if (route.subRoutes) {
                          return route.subRoutes.map(({ path, component }) => (
                            <Route path={path} key={path} exact component={component} />
                          ));
                        }
                        return (
                          <Route
                            path={route.path}
                            exact
                            key={route.path}
                            component={route.component}
                          />
                        );
                      })
                    }
                  />
                  <Redirect to="/home" />
                </Switch>
              </Suspense>
            </DefaultLayout>
          )}
        />
      </Switch>
    </BrowserRouter>
  </GlobalStateProvider>
);

export default memo(App);
