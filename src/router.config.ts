import { lazy, ReactNode } from 'react';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const home = lazy(() => import('@/pages/home'));
const mine = lazy(() => import('@/pages/mine'));
const largeUpload = lazy(() => import('@/pages/largeUpload'));
const zustandPage = lazy(() => import('@/pages/zustandDemo'));

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
                component: mine,
                key: 'mine',
                label: 'mine',
            },
            {
                path: '/large-upload',
                component: largeUpload,
                key: 'largeUpload',
                label: 'largeUpload',
            },
            {
                path: '/zustand-demo',
                component: zustandPage,
                key: 'zustand',
                label: 'zustand',
            },
        ],
    },
];

export default routes;
