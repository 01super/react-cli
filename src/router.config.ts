import { lazy, ReactNode } from 'react';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const home = lazy(() => import('@/pages/home'));
const mine = lazy(() => import('@/pages/mine'));

export type RouteType = ItemType & {
    component?: any;
    icon?: ReactNode;
    children?: RouteType[];
    path: string;
};

const routes: RouteType[] = [
    {
        path: '/',
        label: '主页',
        key: '主页',
        children: [
            {
                path: '/',
                component: home,
                label: 'home',
                key: 'home',
            },
            {
                path: '/mine',
                exact: true,
                component: mine,
                key: 'mine',
                label: 'mine',
            },
        ],
    },
];

export default routes;
