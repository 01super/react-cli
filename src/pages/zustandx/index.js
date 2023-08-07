import { useSyncExternalStore } from 'react';
import { createStore } from './vanilla';

export const create = (createState) => {
    const setState = () => {};
    const getState = () => {};

    const api = createStore(createState);

    // 可能需要一些 selector 操作
    const useBoundStore = () => useStore(api);

    return useBoundStore;
};

export function useStore(api) {
    const slice = useSyncExternalStore(api.subscribe, api.getState);
    return slice;
}
