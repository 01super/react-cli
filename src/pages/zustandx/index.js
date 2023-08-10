// 不支持 selector 和 equalityFn
// import { useSyncExternalStore } from 'react';

import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js';

import { createStore } from './vanilla';

export function useStore(api, selector = api.getState, equalityFn) {
    const slice = useSyncExternalStoreWithSelector(
        api.subscribe,
        api.getState,
        api.getServerState,
        selector,
        equalityFn,
    );
    return slice;
}

export const create = (createState) => {
    // 闭包
    const api = createStore(createState);

    // 可能需要一些 selector, 自定义比较变化函数
    const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);

    // 添加api
    Object.assign(useBoundStore, api);

    return useBoundStore;
};
