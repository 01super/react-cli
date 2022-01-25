import { lazy } from 'react';
import { BreadcrumbsRoute } from '@/utils/useBreadcrumb';

const home = lazy(() => import('@/pages/home'));
const mine = lazy(() => import('@/pages/mine'));

export interface RouteType extends BreadcrumbsRoute {
    exact?: boolean;
    component?: any;
    icon?: any;
    name?: string;
    menu?: boolean; // 不需要显示在菜单中，则设为 false
    routes?: RouteType[];
}

const routes: RouteType[] = [
    {
        path: '/',
        exact: true,
        breadcrumb: '主页',
        name: '主页',
        routes: [
            {
                path: '/home',
                exact: true,
                component: home,
                breadcrumb: 'home',
                name: 'home',
                routes: [
                    {
                        path: '/mine',
                        exact: true,
                        component: mine,
                        breadcrumb: 'mine',
                        name: 'mine',
                    },
                ],
            },
        ],
    },
];

export default routes;
