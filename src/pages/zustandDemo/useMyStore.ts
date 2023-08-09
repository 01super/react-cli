// import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { create } from '../zustandx';

const useMyStore = create(
    // 使用 redux-devtools 来观察state的变化, 对于层级深，数据复杂的
    devtools((set, get) => ({
        count: 1,
        increase: () => set(() => ({ count: get().count + 1 })),
        randomNum: 0,
        setRandomNum: () => set(() => ({ randomNum: Math.random() })),
    })),
);

export default useMyStore;

export const desc = () =>
    useMyStore.setState((p) => {
        return {
            count: p.count - 1,
        };
    });
