import { createStore } from './vanilla';

import { useDebugValue } from 'react';

// 做兼容用的，比如旧版的 react 没有这个 hooks，但是可以使用这个
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector.js';

export * from './vanilla';

const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;

function useStore(api, selector = api.getState, equalityFn) {
    if (process.env.NODE_ENV !== 'production' && equalityFn) {
        console.warn(
            "[DEPRECATED] Use `createWithEqualityFn` from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
        );
    }
    const slice = useSyncExternalStoreWithSelector(
        api.subscribe,
        api.getState,
        api.getServerState || api.getState,
        selector,
        equalityFn,
    );
    useDebugValue(slice);
    return slice;
}

const createImpl = (createState) => {
    if (process.env.NODE_ENV !== 'production' && typeof createState !== 'function') {
        console.warn(
            "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
        );
    }

    // 创建一个闭包
    const api = typeof createState === 'function' ? createStore(createState) : createState;

    const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
    Object.assign(useBoundStore, api);
    // 执行create()后拿到的一个hooks
    return useBoundStore;
};
const create = (createState) => (createState ? createImpl(createState) : createImpl);

var react = (createState) => {
    if (process.env.NODE_ENV !== 'production') {
        console.warn(
            "[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`.",
        );
    }
    return create(createState);
};

export { create, react as default, useStore };
