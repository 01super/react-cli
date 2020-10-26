import { lazy, ReactNode } from 'react';
import Home from '@/pages/home';

const Mine = lazy(() => import('@/pages/mine'));

export interface RouteType {
  path?: string;
  exact?: boolean;
  component?: any;
  title?: string;
  icon?: ReactNode;
  subRoutes?: RouteType[];
}

const routes: RouteType[] = [
  {
    path: '/home',
    exact: true,
    component: Home,
    title: 'Home'
  },
  {
    exact: true,
    title: 'Sub Page',
    subRoutes: [
      {
        path: '/mine',
        exact: true,
        component: Mine,
        title: 'Mine'
      }
    ]
  }
];

export default routes;
